# ML-Based Product Recommendation Shopify App 🛍️🧠

## Inleiding 🚀
Dit project is een Shopify App die connecties maakt met een API en Database voor een Machine Learning Aanbevelingssysteem. Het is een uitgebreide app die zich richt op het verbeteren van de winkelervaring door gepersonaliseerde productaanbevelingen. Een werkende demo van de app is te vinden op mijn [Shopify Testwinkel](https://youpteststore1.myshopify.com).
> **⚠️** De demo-site werkt alleen wanneer de server draait op de iMac op kantoor. Daarbij moet de Python server aanstaan die te vinden is in [deze repo](https://github.com/youpv/ML-Aanbevelingssysteem).

## Belangrijkste Kenmerken 🌟
- **Eigen API Endpoints**: Beheert orders en producten via `pages/api/apps/orders` en `pages/api/apps/products`.
- **Cross-Sell Extension**: Een belangrijk onderdeel van de app, gelegen in `extensions/extensions/demo-extension-python/blocks/cross-sell.liquid`, biedt cross-sell mogelijkheden in de Shopify winkel.

## Technologieën Gebruikt 💻
- Next.js
- Prisma
- Shopify API

## Installatie 💾

1. **Kloon de Repository** 👨‍💻
   ```
   git clone https://github.com/youpv/shopify-nextjs-prisma-app.git
   cd shopify-nextjs-prisma-app
   ```

2. **Installeer NPM Pakketten** 📦
   ```
   npm install
   ```

3. **Configureer en Start de Applicatie** 🌟  
   Volg de instructies in de `package.json` om de app te configureren en te starten.

## Gebruik 📋
Na het configureren en starten van de app, kun je de Shopify App integreren met je Shopify winkel. Gebruik de cross-sell extensie om gepersonaliseerde productaanbevelingen aan je klanten te tonen.

## API Endpoints 📡
- **Orders**: Beheer bestellingen via de endpoints in `pages/api/apps/orders`.
- **Producten**: Beheer productgegevens via de endpoints in `pages/api/apps/products`.

## Cross-Sell Extensie 🛒
De cross-sell extensie in `extensions/extensions/demo-extension-python/blocks/cross-sell.liquid` is het hart van de app. Het biedt een dynamische manier om gerelateerde producten aan klanten te tonen, wat de verkoop kan stimuleren.

## Licentie 📜
Dit project is gebouwd op de basisapplicatie van [Harshdeep Singh Hura](https://github.com/kinngh) en is gelicenseerd onder de [MIT License](LICENSE).

## Bijdragen 👥
Ik accepteer geen bijdragen aan dit project.
