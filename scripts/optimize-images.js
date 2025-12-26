const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const CONFIG = {
    sourceDir: path.join(__dirname, '../assets'),
    quality: 80, // WebP quality (0-100)
    maxWidth: 1920, // Max width for resize (optional)
};

// Utilities
const isImage = (file) => /\.(png|jpe?g)$/i.test(file);
const getWebpPath = (filePath) => filePath.replace(/\.(png|jpe?g)$/i, '.webp');

async function processDirectory(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.isFile() && isImage(entry.name)) {
            await convertImage(fullPath);
        }
    }
}

async function convertImage(filePath) {
    const webpPath = getWebpPath(filePath);

    // Skip if webp already exists and is newer than source
    if (fs.existsSync(webpPath)) {
        const sourceStats = fs.statSync(filePath);
        const webpStats = fs.statSync(webpPath);
        if (webpStats.mtime > sourceStats.mtime) {
            console.log(`Skipping (already optimized): ${path.basename(filePath)}`);
            return;
        }
    }

    try {
        const image = sharp(filePath);
        const metadata = await image.metadata();

        let pipe = image.webp({ quality: CONFIG.quality });

        if (metadata.width > CONFIG.maxWidth) {
            pipe = pipe.resize(CONFIG.maxWidth);
        }

        await pipe.toFile(webpPath);

        // Calculate savings
        const sourceSize = fs.statSync(filePath).size;
        const webpSize = fs.statSync(webpPath).size;
        const savings = ((sourceSize - webpSize) / sourceSize * 100).toFixed(1);

        console.log(`✅ Converted: ${path.basename(filePath)} -> .webp (${savings}% reduced)`);
    } catch (error) {
        console.error(`❌ Error converting ${path.basename(filePath)}:`, error.message);
    }
}

// Main execution
console.log('🚀 Starting Image Optimization (WebP)...');
console.log(`📂 Scanning: ${CONFIG.sourceDir}`);

processDirectory(CONFIG.sourceDir)
    .then(() => console.log('✨ Image conversion complete!'))
    .catch(err => console.error('Fatal error:', err));
