const fs = require('fs');
const path = require('path');
const convertHEIC = require('heic-convert');

const inputDir = './input'; // replace with your input directory
const outputDir = './converted'; // replace with your output directory

fs.readdir(inputDir, async (err, files) => {
    if (err) {
        return console.error('Failed to read directory:', err);
    }

    const heicFiles = files.filter(file => path.extname(file).toLowerCase() === '.heic');

    try {
        await Promise.all(heicFiles.map(async file => {
            const buffer = fs.readFileSync(path.join(inputDir, file));
            const outputBuffer = await convertHEIC({
                buffer: buffer, // the HEIC file buffer
                format: 'PNG', // output format
                quality: 1 // the png compression quality, between 0 and 1
            });

            fs.writeFileSync(path.join(outputDir, `${path.basename(file, '.heic')}.png`), outputBuffer);
        }));

        console.log('Images converted successfully');
    } catch (err) {
        console.error('Failed to convert images:', err);
    }
});