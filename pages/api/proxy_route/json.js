// import clientProvider from "@/utils/clientProvider";
// import withMiddleware from "@/utils/middleware/withMiddleware.js";

// /**
//  * @param {import("next").NextApiRequest} req - The HTTP request object.
//  * @param {import("next").NextApiResponse} res - The HTTP response object.
//  */
// const handler = async (req, res) => {
//   const { client } = await clientProvider.offline.graphqlClient({
//     shop: req.user_shop,
//   });

//   const { handle } = req.query;
//   console.log("handle", handle);
//   const content = handle
//     ? `Recommendation for ${handle}`
//     : "No recommendation found.";

//   return res.status(200).send({ content });
// };

// export default withMiddleware("verifyProxy")(handler);

// If you have the recommended extension installed, create a new page and type `createproxy` to generate proxy route boilerplate

import useFetch from "@/components/hooks/useFetch";
import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware.js";

/**
 * @param {import("next").NextApiRequest} req - The HTTP request object.
 * @param {import("next").NextApiResponse} res - The HTTP response object.
 */

const fetch = useFetch();

const getRecommendations = async (handle, numRecs) => {
  try {
    const response = await fetch(
      `${process.env.SHOPIFY_APP_URL}/api/recommendation/${handle}/${numRecs}`
    );
    const data = await response.json();
    console.log("data", data);
    return data.recommendations[0];
  } catch (error) {
    console.log(error);
    return "Geen gekozen product";
  }
};

const handler = async (req, res) => {
  const { client } = await clientProvider.offline.graphqlClient({
    shop: req.user_shop,
  });
  const { handle, numRecs } = req.query;

  const recommendation = await getRecommendations(handle, numRecs);

  const response = await client.query({
    data: `{products(first: 250) {edges { node { id title handle description tags}}}}`,
  });

  return res.status(200).send({
    All_Products: response.body.data.products,
    Queried_Product: handle || "No handle found",
    Recommendation: recommendation,
  });
};

export default withMiddleware("verifyProxy")(handler);
