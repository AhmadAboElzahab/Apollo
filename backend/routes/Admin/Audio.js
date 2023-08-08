const express = require("express");
const multer = require("multer");
const path = require("path");
const Audio = require("../../models/Audio.model");
const router = express.Router();
const fs = require("fs");
const Category = require("../../models/Category.model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/audio"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = new Date().toISOString().replace(/:/g, "-");
    cb(null, `original_${uniqueSuffix}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("Only audio files are allowed."));
    }
  },
});

function convertToWav(audioData) {
  return audioData;
}

router.post("/", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file selected." });
  }

  const { title, description, price, category } = req.body;
  const inputFilePath = req.file.path;

  try {
    const audioStream = fs.createReadStream(inputFilePath);
    const audioData = [];
    audioStream.on("data", (chunk) => {
      audioData.push(chunk);
    });

    audioStream.on("end", () => {
      const fullAudioBuffer = Buffer.concat(audioData);

      const wavAudioData = convertToWav(fullAudioBuffer);

      const outputFilePath = path.join(
        __dirname,
        "../../uploads/audio",
        `${new Date().toISOString().replace(/:/g, "-") + "-" + title}.wav`
      );
      fs.writeFileSync(outputFilePath, wavAudioData);

      const audio = new Audio({
        title,
        description,
        Audio: path.basename(outputFilePath),
        price,
        category,
      });

      fs.unlinkSync(inputFilePath);
      audio
        .save()
        .then(() => {
          res.json({ message: "Audio file uploaded and saved successfully." });
        })
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .json({ error: "Error saving audio data to MongoDB." });
        });
    });

    audioStream.on("error", (err) => {
      console.error(err);
      res.status(500).json({ error: "Error reading the audio file." });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing audio data." });
  }
});
router.delete("/:id", async (req, res) => {
  const audioId = req.params.id;
  try {
    const audio = await Audio.findById(audioId);
    if (!audio) {
      return res.status(404).json({ error: "Audio not found." });
    }

    const audioPath = audio.Audio; // Fixed property name from `art` to `Audio`
    const filePath = path.join(__dirname, `../../uploads/audio/${audioPath}`);

    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete Audio." });
      }

      try {
        await audio.deleteOne();
        res.json({ message: "Audio was deleted successfully." }).status(200);
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Failed to delete Audio from the database." });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error finding Audio." });
  }
});

router.patch("/:id", async (req, res) => {
  const audioId = req.params.id;
  const { title, price, description, category } = req.body;

  try {
    let audioToUpdate = await Audio.findById(audioId);

    if (!audioToUpdate) {
      return res.status(404).json({ error: "Audio not found." });
    }

    if (title) {
      audioToUpdate.title = title;
    }

    if (price) {
      audioToUpdate.price = price;
    }

    if (description) {
      audioToUpdate.description = description;
    }

    if (category) {
      audioToUpdate.category = category;
    }

    await audioToUpdate.save();

    res
      .json({ message: "Audio updated successfully", audio: audioToUpdate })
      .status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update audio." });
  }
});

router.get("/", async (req, res) => {
  try {
    const allAudio = await Audio.find();

    const categoryIds = [...new Set(allAudio.map((audio) => audio.category))];

    const categories = await Category.find({ _id: { $in: categoryIds } });

    const categoryMap = {};
    categories.forEach((category) => {
      categoryMap[category._id.toString()] = category.title;
    });

    const AudioWithCategories = allAudio.map((audio) => ({
      _id: audio._id,
      title: audio.title,
      description: audio.description,
      category: categoryMap[audio.category.toString()],
      price: audio.price,
      Audio: audio.Audio,
    }));

    res.json(AudioWithCategories);
  } catch (error) {
    console.error("Error fetching Audio:", error);
    res.status(500).json({ error: "Failed to fetch Audio." });
  }
});

module.exports = router;
