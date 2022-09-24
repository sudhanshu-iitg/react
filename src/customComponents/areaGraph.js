import React from "react";
import { AreaChart, Tooltip, Area, ResponsiveContainer } from "recharts";
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

const CustomAreaChart = ({ data, classes }) => {
  return data?.length > 0 ? (
    <>
      <ResponsiveContainer width={"103%"} height={350}>
        <AreaChart
          data={data}
          strokeWidth={2}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient> */}
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C5B1FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#C5B1FF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Tooltip cursor={false} content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="sum"
            stroke="#C5B1FF"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  ) : (
    <div style={{ padding: 10 }}>
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
    </div>
  );
};

export default withStyles(style)(CustomAreaChart);
