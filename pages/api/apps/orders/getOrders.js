import clientProvider from "@/utils/clientProvider";
import withMiddleware from "@/utils/middleware/withMiddleware";

const handler = async (req, res) => {
    try {
        const { client } = await clientProvider.graphqlClient({
            req,
            res,
            isOnline: true,
        });

        const response = await client.query({
            data: `query {
                orders(first: 25) {
                    edges {
                        node {
                            id
                            name
                            customer {
                                id
                            }
                            lineItems(first: 10) {
                                edges {
                                    node {
                                        product {
                                            id
                                            handle
                                        }
                                        quantity
                                    }
                                }
                            }
                        }
                    }
                }
            }`,
        });

        res.status(200).send(response.body.data.orders);
    } catch (e) {
        console.error(e);
        return res.status(400).send({ error: true });
    }
};

export default withMiddleware("verifyRequest")(handler);