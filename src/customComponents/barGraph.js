import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
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

const CustomizedLabel = ({ props }) => {
  const { x, y, fill, value } = props;
  return (
    <text
      x={x}
      y={y}
      dy={-4}
      fontSize="16"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

const CustomBarChart = ({ data, classes }) => {
  return data?.length > 0 ? (
    <>
      <div>
        <p style={{ color: "#E9C547", fontWeight: 700, margin: "20px" }}>
          Daily Joining
        </p>
      </div>
      <ResponsiveContainer width={"105%"} height={450}>
        <BarChart
          data={data}
          margin={{ top: 25, right: 10, left: 10, bottom: 25 }}
        >
          <XAxis
            dataKey="date"
            fontFamily="sans-serif"
            tickSize
            dy="25"
            stroke="#808080"
          />
          <YAxis hide />
          <Bar dataKey="sum" barSize={40} fontFamily="Oxygen">
            {data.map((entry, index) => (
              <>
                <Cell fill={"#C5B1FF"} />
                <LabelList
                  dataKey="sum"
                  position="top"
                  stroke="#E9C547"
                  strokeWidth={0.5}
                />
              </>
            ))}
          </Bar>
        </BarChart>
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

export default withStyles(style)(CustomBarChart);
