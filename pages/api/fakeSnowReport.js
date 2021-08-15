import { mammothData } from "../mammothFaker";
export default function handler(req, res) {
  res.status(200).json(mammothData);
}
