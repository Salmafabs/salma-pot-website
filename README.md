# Salma Pot website

Static site for Salma Pot — private dining, party & event catering, delivery only.
Same GitHub + Actions + Pages setup as the devops practice site.

## What's here

```
index.html              — the whole site (one page, anchor-linked sections)
css/style.css            — all styling
js/script.js              — mobile nav toggle + footer year
assets/salma-pot-logo.png — your logo
.github/workflows/deploy.yml — builds + deploys to GitHub Pages on every push to main
CNAME                    — points GitHub Pages at salmapot.co.uk (delete this file if you're not using that domain yet)
```

## Every placeholder still to fill in

Search the project for the word `REPLACE` — every one marks something you need to add:

- Menu items, short descriptions, and prices (index.html, Menu section)
- Delivery areas, minimum order, delivery charge, order cut-off time (index.html, Delivery section)
- WhatsApp number in the "Order Now" button (`href="https://wa.me/REPLACEPHONENUMBER"`) — replace with your number in international format, no spaces or +, e.g. `447123456789`
- Real photos in the Gallery section (currently coloured placeholder tiles)

Once those are in, delete the yellow `build-banner` div at the top of `index.html` — it's just a draft flag for you, not meant to go live.

## First-time setup

1. Create a new **public** repo on GitHub, e.g. `salma-pot-website`.
2. Push this folder to it:
   ```
   git init
   git add .
   git commit -m "Initial Salma Pot site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/salma-pot-website.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**. That's it — every push to `main` now rebuilds and redeploys automatically, same as the devops practice site.
4. Your site will be live at `https://<your-username>.github.io/salma-pot-website/` within a minute or two of the first push.

## Connecting salmapot.co.uk

Once you've bought the domain (check availability with any UK registrar — 123-Reg, GoDaddy, Namecheap, etc.):

1. At your domain registrar, add these DNS records:
   - Four **A** records for `@` pointing to GitHub's Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record for `www` pointing to `<your-username>.github.io`
2. In the repo, go to **Settings → Pages → Custom domain**, enter `salmapot.co.uk`, and save. GitHub will verify DNS and issue an HTTPS certificate automatically (can take up to 24 hours).
3. The `CNAME` file in this repo already has `salmapot.co.uk` in it, so this step just needs your DNS to catch up — no code changes needed.

If you'd rather hold off on the domain, delete the `CNAME` file and skip this section — the `github.io` link will work fine in the meantime.
