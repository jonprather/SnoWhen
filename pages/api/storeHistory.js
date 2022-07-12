import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { resort } = req.body;
    const { token } = cookie.parse(req.headers.cookie);
    if (!resort) {
      return res.status(400).json({
        error: "Missing required params",
      });
    } //shouldn't happen bc cleint side validation but i suppose helps from non browser based agents
    if (!token) {
      return res.status(403).json({
        error: "Not Authorized",
      });
      //token will be validated by strapi if someone spoofs this
    }
    const strapiRes = await fetch(`${API_URL}/api/favorites?populate=*`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { resort } }),
    });

    const data = await strapiRes.json();
    if (strapiRes.ok) {
      res.status(200).json({ data });
    } else {
      res.status(data.error.status).json({ message: data.error.message });
    }
    //TODO this is wrong i think i dont think the data is like this
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
