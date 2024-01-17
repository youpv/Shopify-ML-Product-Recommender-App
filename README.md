
<h1 align="center">
  <br>
  <a href="https://youpteststore1.myshopify.com"><img src="https://github.com/youpv/shopify-nextjs-prisma-app/blob/dee72f565eae546ebb59663cdf7356562ecc9c14/.github/assets/ProjectLogo.png?raw=true" alt="Youp Stage Project S6" width="200"></a>
  <br>
  🛍️ Shopify ML Product Recommender App 🧠
  <br>
</h1>

<h4 align="center">Een custom Shopify app voor productaanbevelingen met <a href="https://github.com/youpv/ML-Aanbevelingssysteem" target="_blank">machine learning</a>.</h4>

<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" 
         alt="Next.js" height="28">
  </a>
  <a href="https://prisma.io/">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" 
         alt="Prisma ORM" height="28">
  </a>
  <a href="https://shopify.dev/docs/apps">
    <img src="https://img.shields.io/badge/shopify-8DB543?style=for-the-badge&logo=Shopify&logoColor=white" 
         alt="Shopify" height="28">
  </a>
</p>

<p align="center">
  <a href="#inleiding-">Inleiding</a> •
  <a href="#belangrijkste-kenmerken-">Belangrijkste Kenmerken</a> •
  <a href="#technologieën-">Technologieën</a> •
  <a href="#installatie-">Installatie</a> •
  <a href="#gebruik-">Gebruik</a> •
  <a href="#licentie-">Licentie</a> •
  <a href="#bijdragen-">Bijdragen</a>
</p>

<p align="center">
  <img src="https://github.com/youpv/shopify-nextjs-prisma-app/blob/dee72f565eae546ebb59663cdf7356562ecc9c14/.github/assets/shopify-app-preview.gif?raw=true" alt="Screenshot App Functionality">
</p>

## Inleiding 🚀
Dit project is een Shopify App die connecties maakt met een API en Database voor een Machine Learning Aanbevelingssysteem. Het is een uitgebreide app die zich richt op het verbeteren van de winkelervaring door gepersonaliseerde productaanbevelingen. Een werkende demo van de app is te vinden op mijn [Shopify Testwinkel](https://youpteststore1.myshopify.com).
> **⚠️** De demo-site werkt alleen wanneer de server draait op de iMac op kantoor. Daarbij moet de Python server aanstaan die te vinden is in [deze repo](https://github.com/youpv/ML-Aanbevelingssysteem).

## Belangrijkste Kenmerken 🌟
- **Eigen API Endpoints**: Beheert orders en producten via [`pages/api/apps/orders`](https://github.com/youpv/shopify-nextjs-prisma-app/tree/main/pages/api/apps/orders) en [`pages/api/apps/products`](https://github.com/youpv/shopify-nextjs-prisma-app/tree/main/pages/api/apps/products).
- **Cross-Sell Extension**: Een belangrijk onderdeel van de app, gelegen in [`extensions/extensions/demo-extension-python/blocks/cross-sell.liquid`](https://github.com/youpv/shopify-nextjs-prisma-app/blob/main/extensions/extensions/demo-extension-python/blocks/cross-sell.liquid), biedt cross-sell mogelijkheden in de Shopify winkel.

## Technologieën 💻
- [Next.js](https://nextjs.org/)
- [Prisma](https://prisma.io/)
- [Shopify](https://shopify.dev/docs/apps)

## Installatie 💾

1. **Kloon de Repository** 👨‍💻
   ```bash
    $ git clone https://github.com/youpv/shopify-nextjs-prisma-app.git
    $ cd shopify-nextjs-prisma-app
    ```

2. **Installeer NPM Pakketten** 📦
   ```bash
   $ npm install
   ```

3. **Configureer en Start de Applicatie** 🌟  
   Volg de instructies in de `package.json` om de app te configureren en te starten.

## Gebruik 📋
Na het configureren en starten van de app, kun je de Shopify App integreren met je Shopify winkel. Gebruik de cross-sell extensie om gepersonaliseerde productaanbevelingen aan je klanten te tonen.

## Licentie 📜
Dit project is gebouwd op de basisapplicatie van [Harshdeep Singh Hura](https://github.com/kinngh) en is gelicenseerd onder de [MIT License](LICENSE).

## Bijdragen 👥
Dit project is een onderdeel van mijn stage bij [EnoRm](https://enorm.com/). Alleen medewerkers van EnoRm kunnen bijdragen aan dit project.