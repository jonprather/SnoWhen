import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { resort } = req.body.data;
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
      // Set Cookie
      //what do i get back anything i can use maybe just msg
      res.status(200).json({ data });
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

// import cookie from "cookie";
// import { API_URL } from "@/config/index";

// export default async (req, res) => {
//   if (req.method === "POST") {
//     console.log("REQ BODY in toggleLike", req.body, req.query.id);
//     const searchHistoryId = req.query?.id;
//     const favoriteData = req.body;
//     console.log(searchHistoryId, favoriteData);

//     if (!searchHistoryId) {
//       return res.status(400).json({
//         error: "Missing required params",
//       });
//     }
//     const { token } = cookie.parse(req.headers.cookie);
//     console.log(token);

//     const strapiRes = await fetch(
//       `${API_URL}/api/favorites/${searchHistoryId}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...favoriteData }),
//       }
//     );

//     let data = await strapiRes.json();
//     //TODO figure out why this is nested as data.data to make consistent and more clear for FE
//     console.log("STRAPI RES+++", strapiRes);
//     if (strapiRes.ok) {
//       data = data.data;
//       res.status(200).json({ data });
//     } else {
//       console.log("YOU IN FAILED STRAPI RES not OK ");
//       res
//         .status(data.statusCode)
//         .json({ message: data.message[0].messages[0].message });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).json({ message: `Method ${req.method} not allowed` });
//   }
// };
