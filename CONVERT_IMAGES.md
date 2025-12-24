# Guia: Converter Imagens PNG para WebP

O HTML já foi atualizado para suportar imagens WebP! Agora você precisa converter as imagens PNG existentes para WebP.

## 🎯 Imagens que precisam ser convertidas:

Todas as imagens em `assets/` com extensão `.png` precisam de versões `.webp`:

- ✅ `card_agents.png` → `card_agents.webp`
- ✅ `card_automation.png` → `card_automation.webp`
- ✅ `card_branding.png` → `card_branding.webp`
- ✅ `card_chatbot.png` → `card_chatbot.webp`
- ✅ `card_data.png` → `card_data.webp`
- ✅ `card_email.png` → `card_email.webp`
- ✅ `card_integrations.png` → `card_integrations.webp`
- ✅ `card_sites.png` → `card_sites.webp`

---

## 📦 Opção 1: Ferramenta Online (Mais Fácil)

### CloudConvert (Recomendado)
1. Acesse: https://cloudconvert.com/png-to-webp
2. Faça upload de todas as 8 imagens PNG
3. Clique em "Convert"
4. Baixe os arquivos WebP
5. Coloque-os na pasta `assets/`

### Alternativa: Squoosh
1. Acesse: https://squoosh.app/
2. Arraste cada imagem PNG
3. Selecione "WebP" no painel direito
4. Ajuste qualidade para 80-85
5. Baixe e salve em `assets/`

---

## 💻 Opção 2: Linha de Comando (Mais Rápido)

### Windows (PowerShell)

#### Instalar cwebp:
```powershell
# Baixar cwebp manualmente de:
# https://developers.google.com/speed/webp/download
# Ou usar Chocolatey:
choco install webp
```

#### Converter todas as imagens:
```powershell
cd "c:\Users\Tiago Gatão\.gemini\antigravity\playground\explorer\optimaai\assets"

# Converter todas de uma vez
Get-ChildItem -Filter *.png | ForEach-Object {
    $output = $_.BaseName + ".webp"
    cwebp -q 80 $_.Name -o $output
}
```

### Node.js (cross-platform)

#### Instalar sharp:
```bash
npm install -g sharp-cli
```

#### Converter:
```bash
cd "c:/Users/Tiago Gatão/.gemini/antigravity/playground/explorer/optimaai/assets"
npx sharp-cli -i "card_*.png" -o "./" -f webp -q 80
```

---

## 🔍 Verificação

Após converter, verifique que os arquivos WebP foram criados:

```powershell
cd "c:\Users\Tiago Gatão\.gemini\antigravity\playground\explorer\optimaai\assets"
dir *.webp
```

Você deve ver 8 arquivos `.webp` listados.

---

## 🚀 Próximo Passo

Após converter as imagens:
1. Abra `index.html` no navegador
2. Abra DevTools (F12)
3. Vá para a aba "Network"
4. Filtre por "Img"
5. Verifique que as imagens aparecem como `.webp` (não `.png`)
6. Confirme redução de tamanho (~70% menor)

**✅ Fase 1 estará completa!**
