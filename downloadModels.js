const fs = require('fs');
const https = require('https');
const path = require('path');

const modelsDir = path.join(__dirname, 'public', 'models');
if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
}

const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
const files = [
    'tiny_face_detector_model-weights_manifest.json',
    'tiny_face_detector_model-shard1',
    'face_expression_model-weights_manifest.json',
    'face_expression_model-shard1'
];

const downloadFile = (file) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(modelsDir, file);
        const fileStream = fs.createWriteStream(filePath);
        https.get(baseUrl + file, response => {
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded ${file}`);
                resolve();
            });
        }).on('error', err => {
            fs.unlink(filePath, () => {});
            reject(err);
        });
    });
};

Promise.all(files.map(downloadFile))
    .then(() => console.log('All models downloaded successfully.'))
    .catch(err => console.error('Error downloading models:', err));
