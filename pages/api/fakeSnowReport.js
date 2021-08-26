import { mammothData } from "../../lib/mammothFaker";
export default function handler(req, res) {
  res.status(200).json(mammothData);
}
