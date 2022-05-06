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
    // req?.query?.ID is what goes in here but can try hard coded bc dfake resorts
    const strapiRes = await fetch(
      `${API_URL}/api/snow-reports/${req?.query?.ID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // TODO now im getting a 403 forbidden error Auth error but im sending token right?
    // TODO pass down proper error if stuff not found rather than fail silently
    // IE url was wrong got 404 from strapi but that wasnt passed to client
    console.log("IN api Area 2", strapiRes);
    const snowReport = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ snowReport });
    } else {
      res.status(403).json({ message: "User forbidden" });
      // TODO replace this with proper format automatically with .statusText and .status
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
