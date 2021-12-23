const express = require('express');
const promoRouter = express.Router();
const promoTB = require('../model/promoCodeTable');
const dates = require('../middleware/checkDates');

promoRouter.get('/', (req, res) => {
    promoTB.selectAllPromos((err, allPromoInfo) => {
        if (err) res.status(500).json({ error: "Internal Server Error" });
        else res.status(200).json(allPromoInfo);
    });
})

promoRouter.route('/:productID')
    .get((req, res) => {
        const { productID } = req.params;

        if (isNaN(productID)) res.status(500).json({ error: "Internal Server Error" });
        else {
            promoTB.selectProductPromo(productID, (err, promoInfo) => {
                if (err) res.status(500).json({ error: "Internal Server Error" });
                else res.status(200).json(promoInfo);
            });
        }
    })
    .post((req, res) => {
        const { productID } = req.params;
        const { startDate, endDate, discountAmount } = req.body;

        if (isNaN(productID)) res.status(500).json({ error: "Internal Server Error" });
        else {
            dates.checkDates(startDate, endDate, err => {
                if (err) res.status(422).json({ error: err.message });
                else {
                    const promoInfo = {
                        productid: productID,
                        startDate: startDate,
                        endDate: endDate,
                        discountAmount: discountAmount
                    }

                    promoTB.createPromo(promoInfo, (err, affectedRows) => {
                        if (err) res.status(500).json({ error: "Internal Server Error" });
                        else res.status(201).json({ "Affected Rows": affectedRows });
                    });
                }
            });
        }
    });


promoRouter.delete('/:promoid', (req, res) => {
    const { promoid } = req.params;

    if (isNaN(promoid)) res.status(500).json({ error: "Internal Server Error" });
    // check if promo exists before deleting and sending appropriate response
    else {
        promoTB.deletePromo(promoid, (err) => {
            if (err) res.status(500).json({ error: "Internal Server Error" });
            else res.status(204).json();
        });
    }
});

module.exports = promoRouter;