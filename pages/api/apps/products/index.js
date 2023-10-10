import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware";

const handler = async (req, res) => {
  try {
    const { client } = await clientProvider.graphqlClient({
      req,
      res,
      isOnline: true, //false for offline session, true for online session
    });

    const response = await client.query({
      data: `{products(first: 250) {edges { node { id title handle description tags}}}}`, //Paste your GraphQL query/mutation here
    });
    return res.status(200).send({ products: response.body.data.products.edges});
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: true, message: "Bad request"});
  }
};

export default withMiddleware("verifyRequest")(handler);
