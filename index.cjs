const express = require('express');
const fs = require('fs');
const cors = require('cors');
const pdf = require('html-pdf-node');

const app = express();

app.use(cors());
app.use(express.json());

// PDF oluşturma endpoint'i
app.post('/create-pdf', async (req, res) => {
    const { htmlContent } = req.body;

    try {
        // PDF oluşturma için HTML içeriğini hazırlama
        const options = { format: 'A4' };
        const file = { content: htmlContent };

        // PDF oluşturma
        const pdfBuffer = await pdf.generatePdf(file, options);

        // PDF'i kullanıcıya döndürme
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).send('Bir hata oluştu');
    }
});

// Preflight request'leri için OPTIONS methodunu ele alın
app.options('/create-pdf', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.send('OK');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
