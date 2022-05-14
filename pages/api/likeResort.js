import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    console.log("REQ BODY in liked", req.body);
    //ok now getting forbidden error thats better means its an auth problem so verify cookie is gottens
    const { user, resort, createdBy } = req.body;

    const favoriteData = req.body;

    if (!resort || !user) {
      return res.status(400).json({
        error: "Missing required params",
      });
    } //shouldn't happen bc cleint side validation but i suppose helps from non browser based agents
    const { token } = cookie.parse(req.headers.cookie);
    console.log(token);
    const strapiRes = await fetch(`${API_URL}/api/favorites`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { user, resort, createdBy } }),
    });

    const data = await strapiRes.json();
    console.log("STRAPI RES+++", strapiRes);
    if (strapiRes.ok) {
      // Set Cookie
      //what do i get back anything i can use maybe just msg
      // res.status(200).json({ xxx });
    } else {
      console.log("YOU IN FAILED STRAPI RES not OK ");
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
