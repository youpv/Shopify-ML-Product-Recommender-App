// import clientProvider from "@/utils/clientProvider";
// import withMiddleware from "@/utils/middleware/withMiddleware";

// const handler = async (req, res) => {
//   try {
//     const { client } = await clientProvider.graphqlClient({
//       req,
//       res,
//       isOnline: true, //false for offline session, true for online session
//     });

//     const response = await client.query({
//       data: `{products(first: 250) {edges { node { id title handle description tags}}}}`, //Paste your GraphQL query/mutation here
//     });
//     return res.status(200).send({ products: response.body.data.products});
//   } catch (e) {
//     console.error(e);
//     return res.status(400).send({ error: true, message: "Bad request"});
//   }
// };

// export default withMiddleware("verifyRequest")(handler);

// import clientProvider from "@/utils/clientProvider";
// import withMiddleware from "@/utils/middleware/withMiddleware";
// import useFetch from "@/components/hooks/useFetch";

// const fetch = useFetch();

// // const FLASK_SERVER_URL = "http://127.0.0.1:5137";
// const FLASK_SERVER_URL = process.env.SHOPIFY_APP_URL;

// const handler = async (req, res) => {
//   try {
//     const { client } = await clientProvider.graphqlClient({
//       req,
//       res,
//       isOnline: true,
//     });

//     const response = await client.query({
//       data: `{products(first: 250) {edges { node { id title handle description tags}}}}`,
//     });

//     // Send the fetched products to the Flask server
//     const flaskResponse = await fetch(`${FLASK_SERVER_URL}/api/products`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ products: response.body.data.products }),
//     });

//     const recommendedIds = await flaskResponse.json();

//     return res.status(200).send({ recommendedIds: recommendedIds });
//   } catch (e) {
//     console.error(e);
//     return res.status(400).send({ error: true, message: "Bad request" });
//   }
// };

// export default withMiddleware("verifyRequest")(handler);


