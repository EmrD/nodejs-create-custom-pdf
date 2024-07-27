const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

// PDF oluşturma endpoint'i
app.post('/create-pdf', (req, res) => {
    const { title, content } = req.body;

    // Yeni PDF dökümanı oluştur
    const doc = new PDFDocument();
    
    // PDF'i bir dosyaya yaz
    const filename = `output.pdf`;
    doc.pipe(fs.createWriteStream(filename));

    // PDF içeriğini doldur
    doc.fontSize(25).text(title, 100, 100);
    doc.fontSize(12).text(content, 100, 150);

    // PDF'i kapat ve yazmayı bitir
    doc.end();

    // PDF'i döndür
    doc.pipe(res);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
