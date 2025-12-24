const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');

console.log('🎨 Gerando imagens OpenGraph...\n');

// ========== OG IMAGE (1200x630) ==========
function generateOGImage() {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(0.5, '#1a0f1a');
    gradient.addColorStop(1, '#2d1810');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Radial glow
    const glowGradient = ctx.createRadialGradient(600, 315, 0, 600, 315, 600);
    glowGradient.addColorStop(0, 'rgba(249, 115, 22, 0.3)');
    glowGradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Title gradient
    const titleGradient = ctx.createLinearGradient(0, 250, 0, 320);
    titleGradient.addColorStop(0, '#ffffff');
    titleGradient.addColorStop(1, '#f97316');
    ctx.fillStyle = titleGradient;
    ctx.font = 'bold 96px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Óptima Digital', 600, 280);

    // Subtitle
    ctx.fillStyle = '#9ca3af';
    ctx.font = '36px Arial';
    ctx.fillText('Agência de Marketing Digital', 600, 370);
    ctx.font = '32px Arial';
    ctx.fillText('e Automação com IA', 600, 420);

    // Accent line
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(400, 480);
    ctx.lineTo(800, 480);
    ctx.stroke();

    // Badge
    ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
    ctx.fillRect(450, 510, 300, 50);
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Resultados Comprovados', 600, 535);

    const buffer = canvas.toBuffer('image/png');
    const outputPath = path.join(assetsDir, 'og-image.png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ og-image.png gerado! (${(buffer.length / 1024).toFixed(1)} KB)`);
}

// ========== TWITTER CARD (1200x600) ==========
function generateTwitterCard() {
    const canvas = createCanvas(1200, 600);
    const ctx = canvas.getContext('2d');

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 1200, 600);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(0.4, '#1a0820');
    gradient.addColorStop(1, '#2d1008');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 600);

    // Radial glow
    const glowGradient = ctx.createRadialGradient(600, 300, 0, 600, 300, 500);
    glowGradient.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
    glowGradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, 1200, 600);

    // Title gradient
    const titleGradient = ctx.createLinearGradient(0, 220, 0, 300);
    titleGradient.addColorStop(0, '#ffffff');
    titleGradient.addColorStop(1, '#f97316');
    ctx.fillStyle = titleGradient;
    ctx.font = 'bold 88px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Óptima Digital', 600, 260);

    // Tagline
    ctx.fillStyle = '#e5e7eb';
    ctx.font = '34px Arial';
    ctx.fillText('Acelere seus Resultados', 600, 350);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '32px Arial';
    ctx.fillText('com Marketing Digital', 600, 395);

    // Decorative circles
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(200, 300, 80, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(1000, 300, 80, 0, Math.PI * 2);
    ctx.stroke();

    // Bottom badge
    ctx.fillStyle = 'rgba(249, 115, 22, 0.15)';
    ctx.fillRect(400, 460, 400, 50);
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 26px Arial';
    ctx.fillText('Marketing + IA + Automação', 600, 485);

    const buffer = canvas.toBuffer('image/png');
    const outputPath = path.join(assetsDir, 'twitter-card.png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ twitter-card.png gerado! (${(buffer.length / 1024).toFixed(1)} KB)`);
}

// Execute
try {
    generateOGImage();
    generateTwitterCard();
    console.log('\n✨ Imagens OG geradas com sucesso na pasta assets/!');
} catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
}
