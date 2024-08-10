const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const svg2img = require('svg2img');

const imgDir = './img';

fs.readdir(imgDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(imgDir, file);
        const ext = path.extname(file).toLowerCase();

        if (ext === '.svg') {
            svg2img(filePath, (err, buffer) => {
                if (err) {
                    console.error('Error converting SVG to PNG:', err);
                    return;
                }

                const outputPngPath = filePath.replace('.svg', '.png');
                processImage(buffer, outputPngPath);
            });
        } else if (ext === '.png') {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.error('Error reading PNG file:', err);
                    return;
                }

                processImage(data, filePath);
            });
        }
    });
});

function processImage(buffer, outputPath) {
    sharp(buffer)
        .trim() 
        .toFile(outputPath, (err, info) => {
            if (err) {
                console.error('Error processing image:', err);
                return;
            }
            console.log('Processed:', outputPath);
        });
}
