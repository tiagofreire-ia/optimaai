const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');

// Lista de imagens para converter
const images = [
  'card_agents.png',
  'card_automation.png',
  'card_branding.png',
  'card_chatbot.png',
  'card_data.png',
  'card_email.png',
  'card_integrations.png',
  'card_sites.png'
];

console.log('🚀 Iniciando conversão de imagens PNG para WebP...\n');

// Converter cada imagem
Promise.all(images.map(async (imageName) => {
  const inputPath = path.join(assetsDir, imageName);
  const outputPath = path.join(assetsDir, imageName.replace('.png', '.webp'));
  
  try {
    const info = await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = info.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${imageName}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB`);
    console.log(`   WebP: ${(newSize / 1024).toFixed(1)} KB`);
    console.log(`   Redução: ${reduction}%\n`);
    
    return { name: imageName, originalSize, newSize };
  } catch (error) {
    console.error(`❌ Erro ao converter ${imageName}:`, error.message);
    throw error;
  }
}))
.then((results) => {
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
  const totalReduction = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);
  
  console.log('═══════════════════════════════════════');
  console.log('📊 RESUMO FINAL');
  console.log('═══════════════════════════════════════');
  console.log(`Total Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total WebP: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Redução Total: ${totalReduction}%`);
  console.log(`\n✨ Conversão concluída com sucesso!`);
})
.catch((error) => {
  console.error('\n❌ Falha na conversão:', error);
  process.exit(1);
});
