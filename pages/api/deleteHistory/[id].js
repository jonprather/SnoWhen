import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.query; //is it this or params?
    const { token } = cookie.parse(req.headers.cookie);

    console.log("ID 1234-", id);
    //shouldn't happen bc cleint side validation but i suppose helps from non browser based agents
    if (!id) {
      return res.status(403).json({
        error: "Not Authorized",
      });
      //token will be validated by strapi if someone spoofs this
    }
    const strapiRes = await fetch(`${API_URL}/api/favorites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await strapiRes.json();
    if (strapiRes.ok) {
      // Set Cookie
      //what do i get back anything i can use maybe just msg
      res.status(200).json({ data });
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
