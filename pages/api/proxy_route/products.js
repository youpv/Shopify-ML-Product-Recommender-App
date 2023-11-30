import withMiddleware from "@/utils/middleware/withMiddleware.js";

const handler = async (req, res) => {
    if (req.method !== "GET") {
        //GET, POST, PUT, DELETE
        console.log("Serve this request only if method type is GET");
        return res.status(401).send({ error: true });
    }
    try {
        
        res.status(200).send({ content: "Proxy Be Working" });
    } catch (e) {
        console.error(e);
        return res.status(401).send({ error: true });
    }
};

export default withMiddleware("verifyProxy")(handler);