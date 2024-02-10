const express = require('express');
const multer = require('multer');
const convertHEIC = require('heic-convert');
const app = express();
const port = 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/convert', upload.single('images'), async (req, res) => {
    try {
        const outputBuffers = await Promise.all(req.files.map(async file => {
            return await convertHEIC({
                buffer: file.buffer, // the HEIC file buffer
                format: 'PNG', // output format
                quality: 1 // the png compression quality, between 0 and 1
            });
        }));
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="converted.png"'
        });
        res.write(outputBuffers[0]);
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to convert images' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});