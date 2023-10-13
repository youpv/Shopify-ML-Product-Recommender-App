import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";

/**
 * @param {import("next").NextApiRequest} req - The HTTP request object.
 * @param {import("next").NextApiResponse} res - The HTTP response object.
 */
const handler = async (req, res) => {
  const { client } = await clientProvider.offline.graphqlClient({
    shop: req.user_shop,
  });

  const { handle } = req.query;
  console.log("handle", handle);
  const content = handle
    ? `Recommendation for ${handle}`
    : "No recommendation found.";

  return res.status(200).send({ content });
};

export default withMiddleware("verifyProxy")(handler);
