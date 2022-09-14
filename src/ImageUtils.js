const sharp = require('sharp');

class ImageUtils {
    static async resize({ inputPath, files, width }) {
        let totalHeight = 0;
        const images = await Promise.all(files.map(file => {
            return new Promise(resolve => {
                sharp(inputPath + '/' + file, { limitInputPixels: false })
                    .resize(width || 1920)
                    .toBuffer((error, buffer, info) => {
                        totalHeight += info.height;
                        resolve({ error, buffer, info })
                    });
            });
        }));
        return {
            images, 
            totalHeight 
        };
    }

    static async merge({ images, totalHeight, width }) {
        const canvas = sharp({ limitInputPixels: false, create: { width, height: totalHeight, channels: 3, background: { r: 0, g: 0, b: 0 } }});
        let currentHeight = 0;
        const comp = images.map(({ buffer, info }) => {
            const c = {
                input: buffer,
                left: 0,
                top: currentHeight,
                limitInputPixels: false
            }
            currentHeight += info.height;
            return c;
        });
        canvas.composite(comp);
        return canvas;
    }

    static async extract({ canvas, x, y, w, h, q }) {
        return await canvas
            .extract({ top: x, left: y, width: w, height: h })
            .jpeg({ quality: q })
            .toBuffer();
    }
}

module.exports = ImageUtils;
