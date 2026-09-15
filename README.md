# Rudra — Portfolio

> Crafting exceptional digital experiences. Full-stack developer based in India.

Live site: **https://rudraxrd.github.io/portfolio/** (enable GitHub Pages in repo settings)

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8) ![No Build](https://img.shields.io/badge/Build-None_needed-lightgrey)

## ✨ Features

- **Modern Design** — Glassmorphism, gradients, micro-interactions
- **Dark / Light** — System aware + toggle with persistence
- **Fully Responsive** — Mobile-first, works everywhere
- **Fast** — No build step, vanilla JS, Tailwind CDN
- **Accessible** — Keyboard nav, focus states, semantic HTML
- **GitHub Pages Ready** — Deploy in 1 click

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/rudraxrd/portfolio.git
cd portfolio

# Run locally (any static server)
python -m http.server 8000
# or
npx serve .
# or
bunx serve .

# Open http://localhost:8000
```

No npm install needed!

## 📁 Structure

```
portfolio/
├── index.html              # Main site
├── assets/
│   ├── css/style.css       # Custom styles
│   └── js/main.js          # Interactions
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages deploy
└── README.md
```

## 🎨 Customization

Edit these in `index.html`:

- **Name / Bio** — Hero section (line ~95)
- **Projects** — Work section (line ~190)
- **Skills** — About section (line ~350)
- **Contact** — Email, links (line ~450)

All colors use Tailwind + CSS variables. Change the gradient in Hero by editing the `bg-gradient-to-br` classes.

## 🌐 Deploy to GitHub Pages

1. Go to repo **Settings → Pages**
2. Source: **GitHub Actions** (workflow already included)
3. Push to `main` branch → auto deploys

Or manually: Settings → Pages → Deploy from branch → `main` / root

## 📝 License

MIT — Feel free to fork and make it yours!

---

Built with ♥ by [Rudra](https://github.com/rudraxrd) • 2025
