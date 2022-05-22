import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const { token } = cookie.parse(req.headers.cookie);
      const strapiRes = await fetch(`${API_URL}/api/favorites`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resortsSearchHistory = await strapiRes.json();
      if (strapiRes.ok) {
        res.status(200).json({ resortsSearchHistory });
      } else {
        res.status(data.statusCode).json({
          message: resortsSearchHistory.message[0].messages[0].message,
        });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
