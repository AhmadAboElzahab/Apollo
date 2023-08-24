const Payment = require('../models/Payment.model');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');

async function addPayment(req, res) {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    from: process.env.EMAIL,
  });
  const userId = req.userId;
  try {
    const { products, totalPrice } = req.body;
    const newPayment = new Payment({ BuyerID: userId, products, totalPrice });
    const savedPayment = await newPayment.save();
    if (savedPayment) {
      const user = await User.findOne({ _id: savedPayment.BuyerID });
      if (!user) {
        res.json('User not found').status(404);
        return;
      }
      const productsHtml = `
      <table style=" width: 100%; color:white;">
        <thead>
          <tr>
            <th >Name</th>
            <th >Type</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map(
              (p) => `
                <tr>
                  <td>${p.name}</td>
                  <td>${p.type}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
    `;

      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'License',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;background-color:black; color:white; ">
          <h1 style=font-size:60px; >Apollo</h1>
          <h2>Thanks ${user.name} For Purchasing From Apollo music Assets</h2>
          <h2>You have the complete License to use these assets </h2>
          <h2>License Number:${savedPayment.paymentID} </h2>

          ${productsHtml}
        </div>
      `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error occurred:', error.message);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }
    res.json(savedPayment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create and add Payment.' });
  }
}

const getPurchaseHistory = async (req, res) => {
  const userId = req.userId;
  try {
    const History = await Payment.find({ BuyerID: userId });
    if (!History) {
      res.status(404).json({ error: 'No Purchase history' });
      return;
    }
    res.json(History).status(200);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get History' });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    const data = {};

    payments.forEach((payment) => {
      const createdAt = new Date(payment.createdAt);
      const year = createdAt.getFullYear();
      const month = createdAt.toLocaleString('en-US', { month: 'long' });

      if (!data[year]) {
        data[year] = {
          name: year,
          total: 0,
          months: [],
        };
      }

      if (!data[year].months.find((m) => m.name === month)) {
        data[year].months.push({
          name: month,
          total: 0,
        });
      }

      data[year].months.find((m) => m.name === month).total += payment.totalPrice;
      data[year].total += payment.totalPrice;
    });

    const formattedData = Object.values(data).map((yearData) => {
      return {
        year: yearData.name,
        total: yearData.total,
        months: yearData.months,
      };
    });

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  addPayment,
  getPurchaseHistory,
  getPayments,
};
