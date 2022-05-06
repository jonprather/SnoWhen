// import "./styles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { formatDate } from "@/helpers/formatDate";
import { militaryToStandardTime } from "@/helpers/militaryToStandardTime";
//so dont need military time its for when i use the day component when its daily time

export default function SnowTotalGraph({ data }) {
  let dataFin = data.map((ele) => {
    return { name: formatDate(ele.date), snow: ele.total };
  });

  console.log(dataFin);
  return (
    // <ResponsiveContainer width={400} height='80%'>
    <BarChart
      // howcan i get dynamic sizes

      data={dataFin}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />

      <Bar dataKey='snow' fill='#0f4c75' />
    </BarChart>
    // </ResponsiveContainer>
  );
}
