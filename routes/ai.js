const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-description', async (req, res) => {
  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json({ error: 'Product name is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });
    const result = await model.generateContent(
      `Write a short 2-sentence product description for: ${productName}`
    );
    const description = result.response.text();
    res.json({ productName, description });
  } catch (err) {
    console.log('AI Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;