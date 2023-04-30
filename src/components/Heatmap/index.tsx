import React from "react";
import classes from "./index.module.scss";
import { ResponsiveHeatMapCanvas } from "@nivo/heatmap";
import { PlotData } from "../../dataTypes";
import ChartTooltip from "../ChartTooltip";

type Props = {
  data: PlotData[];
};

const Heatmap: React.FC<Props> = ({ data }) => {
  return (
    <div className={classes.main_plot}>
      <ResponsiveHeatMapCanvas
        data={data}
        margin={{ top: 90, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -30,
          legend: "",
          legendOffset: 46,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Genes",
          legendPosition: "middle",
          legendOffset: 70,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Genes",
          legendPosition: "middle",
          legendOffset: -72,
        }}
        colors={{
          type: "quantize",
          scheme: "blues",
          // divergeAt: 0.5,
          minValue: 1,
          maxValue: 25,
          steps: 10,
        }}
        emptyColor="#f5f5f5"
        enableLabels={false}
        borderWidth={1}
        xOuterPadding={0.1}
        xInnerPadding={0.07}
        yOuterPadding={0.05}
        yInnerPadding={0.07}
        hoverTarget="cell"
        legends={[
          {
            anchor: "bottom",
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: "row",
            tickPosition: "after",
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: ">-.2s",
            title: "Phenotype Count →",
            titleAlign: "start",
            titleOffset: 4,
          },
        ]}
        tooltip={({ cell: { serieId,x, y, data } }) => {
          return (
              <ChartTooltip  data={data} serieId={serieId} x={x} y={y}/>
              // <div>123</div>
          );
        }}
      />
    </div>
  );
};

export default Heatmap;
