import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import "../../Font.css";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
import IncomeContext from "../../Context/IncomeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels,
  Legend,
  ArcElement
);

function Ovcard(props) {
  let {Income,Invest,calculateExpense,calculateReserve, setInvest,Expense, setExpense,Reserve, setReserve} = useContext(IncomeContext)

  const Investpercent = ((Invest / Income) * 100).toFixed(1);
  const Expensepercent = ((Expense / Income) * 100).toFixed(1);
  const Reservepercent = ((Reserve / Income) * 100).toFixed(1);

  const val = 100;
  const val2 = Investpercent;
  const val3 = Expensepercent;
  const val4 = Reservepercent;

  const data = {
    2034: {
      labels: ["Red"],
      datasets: [
        {
          borderWidth: 0,
          borderRadius: 0,
          weight: 0.05,
          data: [val,0],
          backgroundColor: ["#09AF60", "#BFBFBF"],
          hoverOffset: false,
        },
      ],
    },
  
    2044: {
      
      datasets: [
        {
          borderWidth: 0,
          borderRadius: [5],
          weight: 0.05,
          data: [val2, 100 - val2],
          backgroundColor: ["#09AF60", "#BFBFBF"],
          hoverOffset: false,
        },
      ],
    },
  
    2054: {
      labels: ["Red"],
      datasets: [
        {
          borderWidth: 0,
          borderRadius: [5],
          weight: 0.05,
          data: [val3, 100 - val3],
          backgroundColor: ["#09AF60", "#BFBFBF"],
          hoverOffset: false,
        },
      ],
    },
  
    2064: {
      labels: ["Red"],
      datasets: [
        {
          weight: 0.05,
          data: [val4, 100 - val4],
          backgroundColor: ["#09AF60", "#BFBFBF"],
          borderWidth: [0],
          borderRadius: [5],
          hoverOffset: false,
        },
      ],
    },
  };
  
  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow the chart to stretch based on its container
    cutout: "80%", // Adjust the size of the cutout
    plugins: {
      datalabels: {
        display: false, // Hide data labels
      },
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips on hover
      },
    },
    hover: {
      mode: null, // Disable hover interaction mode
    },
    layout: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
  };
  
  const chartData = data[2044];
  const value = chartData.datasets[0].data[0];

  return (
    <>
  <div className="flex flex-col  bg-[#DCFFEE] w-[35vw] h-full gap-[2vw] rounded-[20px] p-4 mx-auto">
  <div className="flex flex-col text-center">
    <span className="text-[4vw] md:text-[2.5vw] font-semibold">
      {props.period}
    </span>
    <span className="text-[5vw] md:text-[4vw] font-semibold mt-2">
      {props.amount}
    </span>

    <div className="text-center mt-[5vh]">
      <span className="text-[4vw] md:text-[3vw]">{props.percent}%</span>
    </div>

    <div className="flex items-center justify-center mt-[-13vw] w-full">
      <div className="relative flex items-center justify-center w-[20vw]  h-[20vw] ">
        <Doughnut data={data[props.year]} options={options} />
        <div
          className={`absolute border-[#BFBFBF] z-0 border-[10%] rounded-full ${
            data[2034].datasets[0].data[0] === 100
              ? "border-[#09AF60]"
              : ""
          }`}
        ></div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default Ovcard;
