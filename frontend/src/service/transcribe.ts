import type { NextApiRequest, NextApiResponse } from "next";
interface SubscribeRequest extends NextApiRequest {
  body: {
    url: string;
  };
}
export default function handler(req: SubscribeRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }
  const url = req.body.url;
  console.log(`Saving ${url} is saved to the subscribers table`);
  return res.status(200).json({ success: true });
}
