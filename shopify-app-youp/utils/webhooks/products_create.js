/**
* Replace TOPIC_NAME with a Webhook Topic to enable autocomplete
* @typedef { import("@/_developer/types/2023-07/webhooks.js").PRODUCTS_CREATE } webhookTopic
*/

const productsCreateHandler = async (topic, shop, webhookRequestBody, webhookId, apiVersion) => {
    try {
        /** @type {webhookTopic} */
        const webhookBody = JSON.parse(webhookRequestBody);
        console.log("Products/create webhook was called")
        
    } catch (e) {
        console.error(e);
    }
};

export default productsCreateHandler;