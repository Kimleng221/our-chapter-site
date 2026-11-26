# Our Chapter website

Open the `our-chapter-site` folder in VS Code (File → Open Folder).

## Where to edit what

| I want to change...                          | Open this file          |
|----------------------------------------------|-------------------------|
| Text, sections, buttons, links               | `index.html`            |
| Colours, fonts, sizes, spacing               | `css/style.css`         |
| Khmer wording                                | `js/translations.js`    |
| Telegram / Messenger / WhatsApp contact      | `js/config.js`          |
| Logo and photos                              | `images/` (same file names, or update `index.html`) |
| Brand colours / fonts                        | top of `css/style.css` and the last block ("brand") |
| Animations and behaviour                     | `js/script.js`          |

Colours are the variables in the first lines of `css/style.css`.

## See your changes live

1. In VS Code, open Extensions and install **Live Server**.
2. Right-click `index.html` → **Open with Live Server**.
3. Save a file and the page refreshes by itself.

(Double-clicking `index.html` also works, you just refresh by hand.)

## Before you publish

- In `index.html`, replace `YOUR-DOMAIN.netlify.app` with your real address.
- `og-image.png` is already included (1200×630).
- Keep `index.html` at the top level of the folder so GitHub Pages / Netlify find it.

## Put it on GitHub

```
git init
git add .
git commit -m "Our Chapter site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## Logo files

- `images/logo-mark.png`: wordmark only, used in the top menu
- `images/logo-white.png`: full logo in white, used in the black footer
- `images/logo.png`: full logo in black (transparent background)
- `favicon.ico`, `favicon-32.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`: the "oc." app icons
- `og-image.png`: the preview picture shown when the link is shared
