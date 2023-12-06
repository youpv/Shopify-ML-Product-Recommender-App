import withMiddleware from "@/utils/middleware/withMiddleware.js";
import prisma from "@/utils/prisma";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    //GET, POST, PUT, DELETE
    console.log("Serve this only if the request method is POST");
    return res.status(401).send({ error: true });
  }

  try {
    const orders = req.body;
    console.log("InsideAPI - Orders: ", orders);
    if (orders.length > 0) {
      const deleteAllOrders = await prisma.orders.deleteMany();
      console.log("InsideAPI - DeleteAllOrders: ", deleteAllOrders);
    }
    const result = await prisma.orders.createMany({
      data: orders,
      skipDuplicates: true,
    });

    return res.status(200).send({
      text: "Successfully stored orders to the DB using Prisma." + result,
    });
  } catch (e) {
    console.error("InsideAPI - Error: " + e);
    return res.status(401).send({ error: true });
  }
};

export default withMiddleware("verifyRequest")(handler);
