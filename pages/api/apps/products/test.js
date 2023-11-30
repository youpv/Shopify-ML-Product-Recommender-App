import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware";

const handler = async (req, res) => {
  try {
    const { client } = await clientProvider.restClient({
      req,
      res,
      isOnline: true, //false for offline session, true for online session
    });

    const response = await client.get({
      path: "products.json",
    });
    console.log("InsideAPI - Products: ", response);

    res.status(200).send(response);
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: true });
  }
};

export default withMiddleware("verifyRequest")(handler);
