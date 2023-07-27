const express = require('express');
const Promo = require('../../models/Promo.model');
const adminAuthorization = require('../../middleware/adminAuthorization.middleware');
const router = express.Router();
const couponCode = require('coupon-code');

router.get('/', async (req, res) => {
    try {
        const promoCodes = await Promo.find();
        res.status(200).json({ data: promoCodes });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const { value } = req.body;
        if (value === "")
            return res.status(400).json({ error: "value Should not be empty" });

        const promo = new Promo({
            code: couponCode.generate({ parts: 1 })
            ,
            value
        });

        await promo.save();

        res.status(200).json({ data: promo });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const promoId = req.params.id;
        const deletedPromo = await Promo.findByIdAndDelete(promoId);

        if (!deletedPromo) {
            return res.status(404).json({ error: 'Promo not found' });
        }

        res.status(200).json({ message: "Promo Code Deleted successfuly" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const promoId = req.params.id;
        const { value } = req.body;

        if (value === "")
            return res.status(400).json({ error: "value Should not be empty" });

        const updatedPromo = await Promo.findByIdAndUpdate(promoId, { value }, { new: true });

        if (!updatedPromo) {
            return res.status(404).json({ error: 'Promo not found' });
        }

        res.status(200).json({ data: updatedPromo });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});





module.exports = router;
