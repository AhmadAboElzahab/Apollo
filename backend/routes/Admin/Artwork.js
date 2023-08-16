const express = require('express');
const multer = require('multer');
const path = require('path');
const Artwork = require('../../models/Artwork.model');
const Category = require('../../models/Category.model');
const router = express.Router();
const fs = require('fs');
const sharp = require('sharp');
const { encode } = require('blurhash');

const adminAuthorization = require('../../middleware/adminAuthorization.middleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/artworks/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = new Date().toISOString().replace(/:/g, '-');
    const originalNameWithoutExt = file.originalname.split('.').slice(0, -1).join('.');
    cb(null, 'original_' + uniqueSuffix + '_' + originalNameWithoutExt + '.jpeg');
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File type not supported.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
const encodeImageToBlurhash = (path) =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });

router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, price, category } = req.body;
  const fileName = req.file.filename;

  const convertedImagePath = path.join(
    __dirname,
    '../../uploads/artworks/',
    'converted_' + fileName + '.webp', // Ensure the WebP extension
  );
  await sharp(req.file.path).webp({ quality: 80 }).toFile(convertedImagePath);
  const blurhashString = await encodeImageToBlurhash(convertedImagePath);
  fs.unlinkSync(req.file.path);

  const artwork = new Artwork({
    title,
    description,
    price,
    category,
    art: path.basename(convertedImagePath),
    blurHash: blurhashString,
  });

  try {
    await artwork.save();
    res.json({ message: 'Uploaded', artwork }).status(200);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete('/:id', async (req, res) => {
  const artworkId = req.params.id;
  try {
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found.' });
    }
    const imagePath = artwork.art;
    try {
      fs.unlinkSync(path.join(__dirname, `../../uploads/artworks/${imagePath}`));
      await artwork.deleteOne();
      res.json({ message: 'Artwork and image deleted successfully.' }).status(200);
    } catch (err) {
      console.error('Delete Error:', err);
      res.status(500).json({ error: 'Failed to delete artwork and image.' });
    }
  } catch (err) {
    console.error('Find Artwork Error:', err);
    res.status(500).json({ error: 'Error finding artwork.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allArtworks = await Artwork.find();

    const categoryIds = [...new Set(allArtworks.map((art) => art.category))];

    const categories = await Category.find({ _id: { $in: categoryIds } });

    const categoryMap = {};
    categories.forEach((category) => {
      categoryMap[category._id.toString()] = category.title;
    });

    const ArtworksWithCategories = allArtworks.map((art) => ({
      _id: art._id,
      title: art.title,
      description: art.description,
      category: categoryMap[art.category.toString()],
      price: art.price,
      art: art.art,
      blurHash: art.blurHash,
    }));

    res.json(ArtworksWithCategories);
  } catch (error) {
    console.error('Error fetching Artworks:', error);
    res.status(500).json({ error: 'Failed to fetch Artworks.' });
  }
});

router.patch('/:id', async (req, res) => {
  const artworkId = req.params.id;
  const { title, price, description } = req.body;

  try {
    let artworkToUpdate = await Artwork.findById(artworkId);

    if (!artworkToUpdate) {
      return res.status(404).json({ error: 'Artwork not found.' });
    }
    if (title) {
      artworkToUpdate.title = title;
    }

    if (price) {
      artworkToUpdate.price = price;
    }

    if (description) {
      artworkToUpdate.description = description;
    }
    await artworkToUpdate.save();

    res
      .json({
        message: 'Artwork updated successfully',
        artwork: artworkToUpdate,
      })
      .status(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update artwork.' });
  }
});

module.exports = router;
