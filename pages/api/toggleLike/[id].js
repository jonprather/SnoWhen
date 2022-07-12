import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const searchHistoryId = req.query?.id;
    const favoriteData = req.body;

    if (!searchHistoryId) {
      return res.status(400).json({
        error: "Missing required params",
      });
    }
    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(
      `${API_URL}/api/favorites/${searchHistoryId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...favoriteData }),
      }
    );

    let data = await strapiRes.json();
    //TODO figure out why this is nested as data.data to make consistent and more clear for FE
    if (strapiRes.ok) {
      data = data.data;
      res.status(200).json({ data });
    } else {
      res.status(data.error.status).json({ message: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
