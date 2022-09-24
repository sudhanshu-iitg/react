import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { withStyles } from "@mui/styles";
import NoData from "../assets/noData.svg";

const style = () => ({
  noData: {
    display: "flex !important",
    flexDirection: "column  !important",
    height: "30%",
    width: "60%",
    "@media(max-width: 600px)": {
      width: "80% !important",
    },
    background: "#343434",
    border: "1px solid #545454",
    borderRadius: 10,

    justifyContent: "space-between",
    alignItems: "center",
    color: "#FFE660",
    fontWeight: 700,
    fontSize: 16,
    padding: 25,
    margin: "20px auto",
  },
});

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(197, 177, 255, 0.4)",
          borderRadius: 10,
          padding: "4px 22.5px",
        }}
      >
        <p style={{ color: "#fff", fontWeight: 700 }}>
          {payload[0].payload.date}
        </p>
        <p style={{ color: "#fff", fontWeight: 700 }}> {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

const CustomLineChart = ({ data, classes }) => {
  return data?.length > 0 ? (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        // width={500}
        // height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 0" horizontal={false} />
        <XAxis
          tickLine={false}
          dataKey="month"
          axisLine={false}
          tick={{ fill: "#fff" }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          dx={5}
          tick={{ fill: "#fff" }}
        />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        <Line
          dataKey="sum"
          stroke="#916BBF"
          activeDot={{ r: 8 }}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <div className={classes.noData}>
      <img src={NoData} height={300} width={"100%"} alt="" />
      <p
        style={{
          color: "#FFF",
          fontSize: 16,
          margin: 8,
          marginTop: 18,
        }}
      >
        No Data
      </p>
    </div>
  );
};

export default withStyles(style)(CustomLineChart);
