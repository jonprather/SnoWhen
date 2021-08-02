import React from "react";
import { useRouter } from "next/router";

export default function EventPage(props) {
  const router = useRouter();
  console.log(router);
  return <div>Hi there mr {router.query.slug}</div>;
}
