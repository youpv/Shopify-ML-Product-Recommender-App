# Shopify Cross-Sell App met Machine Learning

## BELANGRIJKE INFORMATIE VOOR GASTEN VAN DEZE REPO
Dit project is nog niet klaar, nog lang niet. Op dit moment is er nog veel refactoring te doen. Wat je wél al kunt bekijken is de extensie code! Ga daarvoor naar [cross-sell.liquid](extensions/extensions/demo-extension-python/blocks/cross-sell.liquid).

PROJECT IS TE TESTEN OP [Test Shopify Store](https://youpteststore1.myshopify.com/). (Werkt alleen als iMac aanstaat hehe.)

Meer is nog niet handig om te beijken. De Python code staat in een andere repo. Mocht je hier geen toegang tot hebben, vraag het me dan. De rest van de readme is nog niet echt relevant.

## Overzicht

Deze Shopify-app integreert machine learning (ML) mogelijkheden, ontwikkeld in Python (andere repo), om een gepersonaliseerde cross-sell sectie toe te voegen aan Shopify-winkels. Door gebruik te maken van geavanceerde ML-algoritmen, analyseert de app klantgedrag en productgegevens om relevante productaanbevelingen te genereren, waardoor de verkoopkansen worden vergroot.

## Belangrijkste Functies

- **Automatische Productaanbevelingen**: Genereert productaanbevelingen gebaseerd op beschikbare data.
- **ML-gedreven Analyse**: Maakt gebruik van Python-gebaseerde machine learning algoritmen om nauwkeurige en effectieve cross-sell mogelijkheden te identificeren.
- **Eenvoudige Integratie**: Naadloze integratie met Shopify-winkels, waardoor winkelbeheerders gemakkelijk de cross-sell sectie kunnen beheren en aanpassen.
- **Real-time Updates**: De aanbevelingen worden in real-time bijgewerkt, rekening houdend met de nieuwste klantinteracties en productwijzigingen.

## Installatie

### Vereisten

- Shopify-winkelaccount
- Python 3.x (voor de ML-component)
- Node.js en npm (voor de Shopify-app)

### Stap-voor-Stap Installatie

1. **Kloon de Repository**:
   ```bash
   git clone https://github.com/youpv/shopify-nextjs-prisma-app.git
   cd shopify-nextjs-prisma-app
   ```

2. **Installeer Afhankelijkheden**:
   ```bash
   npm install
   ```

3. **Configureer Variabelen**:
   Maak een `.env` bestand in de root van het project en vul de vereiste Shopify en database credentials in.

4. **Start ngrok server**:
   ```bash
   npm run ngrok
   ```

5. **Configureer Shop-URL**:
    Plaats de ngrok URL in het `.env` bestand in de root van het project.

6. **Update de Shopify URLs**:
   ```bash
   npm run update:url
   ```
   Pas handmatig in je partnetpaneel de Proxy en GDPR URL's aan.

7. **Start ngrok server**:
   ```bash
   npm run start
   ```

### VEEL STAPPEN KOMEN NOG HIER. DIT IS EEN INCOMPLETE SETUP README.


8. **Configureer de Python ML-Component**:
   Volg de instructies in de Python-component directory om de ML-modellen te trainen en te deployen.

## Gebruik

Na installatie en configuratie zal de app automatisch gepersonaliseerde productaanbevelingen genereren en weergeven in de cross-sell sectie van je Shopify-winkel.

