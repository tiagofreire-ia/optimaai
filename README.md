# 🚀 Óptima Digital - Landing Page v2.0

Bem-vindo ao repositório oficial da **Óptima Digital**, agência especializada em Marketing Digital e Automação com Inteligência Artificial.

> **Status:** ✅ Em Produção (Versão Modular Sênior)

## 📌 Sobre o Projeto

Este projeto é a vitrine digital da Óptima IA. Desenvolvido com foco em **performance**, **escalabilidade** e **arquitetura limpa**, o site apresenta nossas soluções de automação e serviços de marketing.

### Funcionalidades Principais
- 🌓 **Tema Dark/Light:** Sistema robusto com persistência de preferência.
- 🍪 **Gestão de Cookies (LGPD):** Banner modular com controle granular (Analytics, Marketing).
- 📱 **Responsividade Total:** Menu mobile otimizado e layout fluido.
- ⚡ **Performance:** Carregamento ultra-rápido (Build otimizado ~8kb JS).
- 📊 **Integrações:** Google Analytics 4, Microsoft Clarity, Web3Forms.

---

## 🛠️ Stack Tecnológico

A versão 2.0 foi refatorada seguindo princípios de **Engenharia de Software Moderna** (SOLID, DRY):

- **Core:** HTML5 Semântico, Vanilla JavaScript (ES6+ Modules).
- **Estilização:** CSS Modular (PostCSS) + Tailwind CSS v3.
- **Build System:** 
  - `esbuild`: Bundling e minificação de JavaScript.
  - `tailwindcss cli`: Compilação de CSS.
- **Ícones:** Lucide Icons.

---

## 📂 Arquitetura do Projeto

O código foi migrado de uma estrutura monolítica para uma **Arquitetura Modular**:

```
src/
├── js/                  # Lógica Modular
│   ├── core/            # Utilitários de Baixo Nível (DOM, Events, Storage)
│   ├── features/        # Funcionalidades (Cookies, Theme, Form)
│   ├── utils/           # Helpers (Validators, Formatters)
│   └── main.js          # Entry Point
│
├── css/                 # Estilos Modulares
│   ├── base/            # Design Tokens & Reset
│   ├── components/      # UI (Buttons, Cards, Banner)
│   └── layout/          # Header & Footer
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (v16+)
- NPM

### Passos

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/tiagofreire-ia/optimaai.git
   cd optimaai
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento (com Watch Mode):**
   Isso irá compilar o CSS e JS automaticamente ao salvar.
   ```bash
   npm run watch
   ```

4. **Para Build de Produção:**
   Gera os arquivos otimizados `scripts.min.js` e `styles-tailwind.css`.
   ```bash
   npm run build
   ```

---

## 📦 Deploy

O projeto gera arquivos estáticos puros na raiz (`index.html`, `scripts.min.js`, `styles-tailwind.css`). Pode ser hospedado em qualquer servidor estático:

- **Vercel / Netlify:** Basta conectar o repositório (Certifique-se de rodar `npm run build` no build command).
- **GitHub Pages:** Ative nas configurações do repositório.

---

## 📝 Licença

Todos os direitos reservados à **Óptima Digital**.
