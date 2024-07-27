const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/create-pdf', (req, res) => {
  const { title, content } = req.body;
  const doc = new PDFDocument();

  const filename = 'output.pdf';
  doc.pipe(fs.createWriteStream(filename));

  doc.fontSize(25).text(title, 100 , 100); 
  doc.fontSize(12).text(content, 100, 200);

  doc.end();

  doc.pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});