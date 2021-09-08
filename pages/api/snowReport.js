import axios from "axios";
import { mammothData } from "../../lib/mammothFaker";
import { fakeEve } from "../../lib/fakeEve";
import { fakeK } from "../../lib/fakeK";

export default async function handler(req, res) {
  //ill have to take in a req which includes the resort code
  //   __NEXT_INIT_QUERY: { ID: 'undefined' },
  //   query: { ID: 'undefined' },
  console.log("REq is ", req?.query?.ID);
  //works but may want to do some try catch blocks or something
  //   try {
  //     const { data } = await axios.get(
  //       `https://api.weatherunlocked.com/api/resortforecast/${req?.query?.ID}?app_id=${process.env.RESORT_APP_ID}&app_key=${process.env.RESORT_APP_KEY}`
  //     );
  //     res.status(200).json(data);
  //   } catch (error) {
  //     console.log(error.response.data.error);
  //     return "Problem Connecting to the Weather API";
  //   }
  // /api/fakeWeather

  //   console.log("NEW API DATA", data);
  // mmamothData the fake data for now to make work go live put in data obj from the api call above
  // need some error handling thos
  if (619002 == req?.query?.ID) return res.status(200).json(mammothData);
  if (420 == req?.query?.ID) return res.status(200).json(fakeEve);
  if (4201 == req?.query?.ID) return res.status(200).json(fakeK);
  // res.status(200).json(mammothData);
}
