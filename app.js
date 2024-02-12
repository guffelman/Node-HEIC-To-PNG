const express = require('express');
const multer = require('multer');
const convertHEIC = require('heic-convert');
const app = express();
const port = 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/convert', upload.single('image'), async (req, res) => {
    try {
        const outputBuffer = await convertHEIC({
            buffer: req.file.buffer, // the HEIC file buffer
            format: 'PNG', // output format
            quality: 1 // the png compression quality, between 0 and 1
        });

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="converted.png"'
        });
        res.write(outputBuffer);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to convert image' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});