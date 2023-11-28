const AUTH_TOKEN = "WatIsDitKutZeg";  // Replace with your static token

const handler = async (req, res) => {
  if (req.method === "GET") {
    const authToken = req.headers['x-auth-token'];
    if (authToken !== AUTH_TOKEN) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return res.status(200).json({ message: "Hello World" });
  }
  return res.status(405).end(); // Method Not Allowed
};

export default handler;
