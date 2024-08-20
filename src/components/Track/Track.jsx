import React, { useContext, useEffect, useState } from "react";
import "../../Font.css";
import "../../App.css"
import { Doughnut } from "react-chartjs-2";

import ChartDataLabels from "chartjs-plugin-datalabels";
import IncomeContext from "../../Context/IncomeContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  plugins,
} from "chart.js";
import IncomeContextProvider from "../../Context/IncomeContextProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels,
  Legend,
  plugins,
  ArcElement
);

function Track() {
  const [active, setActive] = useState(2054);

  function formatter(val) {
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2);
      return val.endsWith(".00") ? val.slice(0, -3) + " Cr" : val + " Cr";
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2);
      return val.endsWith(".00") ? val.slice(0, -3) + " L" : val + " L";
    } else if (val >= 1000) {
      val = (val / 1000).toFixed(2);
      return val.endsWith(".00") ? val.slice(0, -3) + " K" : val + " K";
    } else {
      return val;
    }
  }

  let { Invest, Returns, Finalarr, FinalTrack } = useContext(IncomeContext);

  const Returnarr = Finalarr;
  const Returntracker = FinalTrack;

  const data = {
    2034: {
      labels: ["Current Savings", "Future Savings"],
      datasets: [
        {
          data: [Returntracker[0], Returntracker[3] - Returntracker[0]],
          backgroundColor: ["#00E879", "#73FFBB"],
          hoverOffset: 0,
          formatter: function (value, context) {
            return context.dataIndex === 0 ? formatter(value) : "";
          },
        },
      ],
    },
    2044: {
      labels: ["Current Savings", "Future Savings"],
      datasets: [
        {
          data: [Returntracker[1], Returntracker[3] - Returntracker[1]],
          backgroundColor: ["#00E879", "#73FFBB"],
          hoverOffset: 0,
        },
      ],
    },
    2054: {
      labels: ["Current Savings", "Future Savings"],
      datasets: [
        {
          data: [Returntracker[2], Returntracker[3] - Returntracker[2]],
          backgroundColor: ["#00E879", "#73FFBB"],
          hoverOffset: 0,
        },
      ],
    },
    2064: {
      labels: ["Current Savings", "Future Savings"],
      datasets: [
        {
          data: [Returntracker[3], Returntracker[3] - Returntracker[3]],
          backgroundColor: ["#00E879", "#73FFBB"],
          hoverOffset: 0,
        },
      ],
    },
  };

  const options = {
    rotation: 270,
    circumference: 180,
    plugins: {
      datalabels: {
        font: {
          weight: "500",
          size: "30px",
        },
        display: false,
        color: "black",

        formatter: function (value, context) {
          const label = context.chart.data.labels[context.dataIndex];
          if (!label) {
            return "";
          } else {
            return formatter(value);
          }
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <div style={{ fontFamily: "Work Sans" }}>
        <div className="h-[90vw] flex flex-col">
          <div className="flex flex-wrap  mt-[3vh] ml-[4vw]">
            <span className="text-2xl sm:text-4xl font-semibold">
              Track Your Savings
            </span>
          </div>
          
          <div className="flex flex-col items-center w-full max-w-lg bg-[#DCFFEE] rounded-lg mt-[2vh] p-4">
            <div className="flex justify-center w-full  h-[52vw]  mt-[-6vh]">
              <div className=" relative w-64 h-64">
                <Doughnut
                  data={
                    active === 2034
                      ? data[2034]
                      : active === 2044
                      ? data[2044]
                      : active === 2054
                      ? data[2054]
                      : active === 2064
                      ? data[2064]
                      : "No Data"
                  }
                  options={options}
                />
              </div>
            </div>

            <div className="absolute w-full mt-[20vw] ">
  <div
    className="flex justify-center font-semibold custom-mt w-full"
    style={{
      fontSize: "clamp(1.2rem, 7vw, 1.3rem)", // Adjust these values as needed
      maxWidth: "100vw",
      whiteSpace: "nowrap",
    }}
  >
    {active === 2034
      ? formatter(Returntracker[0])
      : active === 2044
      ? formatter(Returntracker[1])
      : active === 2054
      ? formatter(Returntracker[2])
      : active === 2064
      ? formatter(Returntracker[3])
      : "No data"}
  </div>

  <div className="flex justify-around custom-space items-center w-full font-semibold mt-[3vw]">
    <div
      className="flex justify-center text-center overflow-hidden w-[20vw]"
      style={{
        fontSize: "clamp(0.75rem, 4.5vw, 1.2rem)", // Adjust these values as needed
        maxWidth: "25vw",
        whiteSpace: "nowrap",
      }}
    >
      {formatter(Returnarr[0])}
    </div>
    <div
      className="flex justify-center text-center  w-[20vw] "
      style={{
        fontSize: "clamp(0.75rem, 4.5vw, 1.2rem)", // Adjust these values as needed
        maxWidth: "25vw",
        whiteSpace: "nowrap",
      }}
    >
      {formatter(Returntracker[3])}
    </div>
  </div>
</div>



            <div className="flex justify-around text-[1.1rem] sm:text-xl font-semibold bg-white h-[4vh] w-full rounded-lg mt-8 relative">
              <div
                className={`absolute transition-transform duration-200 bg-[#71FFBA] h-full w-1/4 rounded-lg ${
                  active === 2034
                    ? "translate-x-[-28.9vw]"
                    : active === 2044
                    ? "translate-x-[-9.5vw]"
                    : active === 2054
                    ? "translate-x-[9.8vw]"
                    : active === 2064
                    ? "translate-x-[28.7vw]"
                    : ""
                }`}
              ></div>

              <button
                className="z-10 w-1/4 text-center"
                onClick={() => {
                  setActive(2034);
                }}
              >
                2034
              </button>

              <button
                className="z-10 w-1/4 text-center"
                onClick={() => {
                  setActive(2044);
                }}
              >
                2044
              </button>

              <button
                className="z-10 w-1/4 text-center"
                onClick={() => {
                  setActive(2054);
                }}
              >
                2054
              </button>

              <button
                className="z-10 w-1/4 text-center"
                onClick={() => {
                  setActive(2064);
                }}
              >
                2064
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Track;
