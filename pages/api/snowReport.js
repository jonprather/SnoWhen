import axios from "axios";
import { mammothData } from "../../lib/mammothFaker";
import { fakeEve } from "../../lib/fakeEve";
import { fakeK } from "../../lib/fakeK";

// TODO
//so it will receive inpu tas a query to a specific resort
//and send out to strapi the call to snowReport/id  the d i passed in
// can then send back the datato client
//then the cleint can use it like before so it shouldnt have to change much there jsut pas the resort id like before
import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);
    // TODO  Remeber have fake resort that wil lfail this call can either return fake data if want or
    //let fail
    const strapiRes = await fetch(
      `${API_URL}/api/snow-report/${req?.query?.ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const snowReport = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ snowReport });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
