import React, { useContext, useEffect, useState } from "react";
import "../../Font.css";
import { Bar } from "react-chartjs-2";
import IncomeContext from "../../Context/IncomeContext";

import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  layouts,
  scales,
  elements,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels,
  Legend
);

function Statistics() {
  const [Scroll, setScroll] = useState(false);
  const [active, setActive] = useState("Inc");
  const [moyear, setMoyear] = useState("Month");

  const handleactive = (btnname) => {
    setActive(btnname);
  };

  let {
    Returns,
    calculateExpense,
    calculateReserve,
    Income,
    Invest,
    setInvest,
    Expense,
    setExpense,
    Reserve,
    setReserve,
    Increment,
    setIncrement,
    inflationRate,
    setInflationRate,
    date,
    inputLoanValue,
    loan,
    setIncome,
    TaxButton,
    setTaxButton,
    Fees,
    OthExp,
    setOthExp,
    Finalarr,
    setFinalarr,
    Apply,
    scrollerlink
  } = useContext(IncomeContext);

  function formatter(val) {
    if (active === "Inv") {
      if (val >= 100000) {
        val = (val / 100000).toFixed(1);
        return val.endsWith(".0") ? val.slice(0, -2) : val;
      } else {
        val = (val / 100000).toFixed(2);
        return val.endsWith(".0") ? val.slice(0, -3) : val;
      }
    }

    if (active === "Res") {
      val = (val / 100000).toFixed(3);
      return val.endsWith(".0") ? val.slice(0, -2) : val;
    } else {
      val = (val / 100000).toFixed(2);
      return val.endsWith(".00") ? val.slice(0, -3) : val;
    }
  }

  const mIncomearr = [];
  const yIncomearr = [];
  const Investarr = [];
  const mInvestarr = [];

  const Expensearr = [];
  const Reservearr = [];
  let Returnsarr = [];
  let MonthlyReturnsarr = [];
  let Returnarr = Returns(0);

  useEffect(() => {
    const expense = calculateExpense(yIncomearr[0] / 12);
    const reserve = calculateReserve(yIncomearr[0] / 12);
    const invest = yIncomearr[0] / 12 - (reserve + expense);
    const slicedReturnsarr = Returnsarr.slice(0, 40);

    setExpense(expense);
    setReserve(reserve);
    setFinalarr(slicedReturnsarr);
    setInvest(invest > 0 ? invest : 0);
  }, [Income, Invest, Apply]);

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthIndex = new Date().getMonth();
  let currYear = new Date().getFullYear();
  let years = [];
  let monthlab = [];
  let yror = 12 / 100;
  let mror = yror / 12;

  const beforeLoanExpense = calculateExpense(Income);
  const beforeLoanReserve = calculateReserve(Income);
  const beforeLoanInvest = Income - (beforeLoanExpense + beforeLoanReserve);

  for (let i = 0; i < 12; i++) {
    let index = (monthIndex + i) % months.length;
    monthlab.push(months[index]);
    years.push(currYear + 1 + i);

    let mInvest = Math.ceil(Invest) * (i + 1);
    let yInvest = mInvest * 12;
    let mExpense = Expense * (i + 1);
    let yExpense = mExpense * 12;
    let mReserve = Reserve * (i + 1);
    let yReserve = mReserve * 12;

    if (moyear === "Month") {
      Investarr.push(yInvest);
      mInvestarr.push(Investarr[0] / 12);
      Expensearr.push(mExpense);
      Reservearr.push(mReserve);
    } else {
      Investarr.push(yInvest);
      Expensearr.push(yExpense);
      Reservearr.push(yReserve);
    }
  }

  for (let i = 0; i < 12; i++) {
    mInvestarr[i] = mInvestarr[i] * (i + 1);
  }

  //Yearly Return
  for (let i = 0; i < 40; i++) {
    Returnsarr.push(Returnarr[i]);
    Investarr.push(Invest * 12 * (i + 1));
  }

  //Monthly Return
  for (let i = 1; i <= 12; i++) {
    let mReturn = Invest * ((Math.pow(1 + mror, i) - 1) / mror) * (1 + mror);
    MonthlyReturnsarr.push(mReturn);
  }

  ("LOAN");

  let loaninput = inputLoanValue.slice(1);
  let mIncome = 0;
  let loanMonth = date ? date.$M + 1 : "";
  let currMonth = monthIndex + 1;

  for (let i = 0; i < 40; i++) {
    let index = monthIndex + i;

    let loanIncome = loaninput;

    if (loanIncome) {
      mIncome = (Income - loanIncome) * (i + 1);
    } else if (loanMonth <= index + 1) {
      mIncome = Income + mIncome;
    }
    i < 12 ? mIncomearr.push(mIncome) : " ";

    let yIncome = Income * 12 * (i + 1);
    yIncomearr.push(yIncome);
  }

  let loanStarted = false;
  let emi = loaninput * 12;
  let yIncome = Income * 12;
  let loanYear = date ? date.$y : "";
  let newloanReturn = [];
  let newloanInvest;
  let count = 1;
  let afterloanInv;
  let loanendInv = [];

  for (let i = 0; i < 40; i++) {
    if (loanYear > currYear && loanYear != 2025) {
      yIncomearr[i] = yIncomearr[i] - emi * (i + 1);
      loanStarted = true;
    } else if (loanYear == currYear && loanYear != 2025) {
      yIncomearr[i] = yIncomearr[i - 1] - loanMonth * loaninput + Income * 12;
      Investarr[i] =
        Investarr[i - 1] +
        loanMonth * Invest +
        beforeLoanInvest * (12 - loanMonth);
      loanendInv = [Investarr[i], i];
    } else if (loanStarted && loanYear != 2025) {
      yIncomearr[i] = yIncomearr[i - 1] + yIncome;
      Investarr[i] = Investarr[i - 1] + beforeLoanInvest * 12;
      count === 1 ? (afterloanInv = Investarr[i]) : "";
      count++;
    }
    currYear++;
  }
  newloanInvest = afterloanInv - loanendInv[0] - Investarr[0];

  for (let i = 0; i < 40; i++) {
    let period = (i + 1) * 12;
    newloanReturn[i] =
      (newloanInvest / 12) *
      ((Math.pow(1 + mror, period) - 1) / mror) *
      (1 + mror);
    Returnsarr[loanendInv[1]] = Returnsarr[loanendInv[1]] + newloanReturn[i];
    loanendInv[1]++;
  }

  if (loanYear === 2025) {
    let incomeFor2025 = yIncomearr[0] - loaninput * loanMonth;
    yIncomearr[0] = incomeFor2025;
    for (let i = 1; i < 40; i++) {
      yIncomearr[i] = yIncomearr[i - 1] + yIncome;
    }
  }

  ("LOAN");

  ("FEES");

  if (Fees && Apply) {
    let Feesinput = Fees.slice(1);
    // yIncomearr[0] =  yIncomearr[0] - Feesinput;
    // mIncomearr[0] =  mIncomearr[0] - (Feesinput/12);

    for (let i = 0; i < yIncomearr.length; i++) {
      yIncomearr[i] = yIncomearr[i] - Feesinput * (i + 1);
      // yIncomearr[i] = (yIncomearr[0]- Feesinput)*(i+1);
      i < 12 ? (mIncomearr[i] = mIncomearr[0] * (i + 1)) : "";
    }
  }

  ("FEES");

  

  ("Inflation");

  if (inflationRate > 0 && Apply) {
    for (let i = 0; i < yIncomearr.length; i++) {
      yIncomearr[i] = yIncomearr[i] - yIncomearr[i] * (inflationRate / 100);
    }
  }

  ("Inflation");

  ("Increment");

  let increment = 0;
  if (Increment > 0 && Apply) {
    for (let i = 0; i < yIncomearr.length; i++) {
      increment = yIncomearr[i] * (Increment / 100);
      yIncomearr[i] = yIncomearr[i] + increment;
    }
  }

  ("Increment");

  ("Other Expenses");

  if (OthExp && Apply) {
    let OthExpense = OthExp.slice(1);
    for (let i = 0; i < yIncomearr.length; i++) {
      yIncomearr[i] = yIncomearr[i] - OthExpense * (i + 1);
    }
  }

  ("Other Expenses");

  ("TAX");

  let yearlyIncome = Income * 12;
  let tax = 0;

  let oldtaxregime = () => {
    if (yearlyIncome > 550000 && yearlyIncome <= 1050000) {
      yearlyIncome = yearlyIncome - 50000;
      let beforecess = 12500 + (yearlyIncome - 500000) * 0.2;
      tax = beforecess * 0.04 + beforecess;
    } else if (yearlyIncome > 1050000) {
      yearlyIncome = yearlyIncome - 50000;
      let beforecess = 12500 + 100000 + (yearlyIncome - 1000000) * 0.3;
      tax = beforecess * 0.04 + beforecess;
    }
    yIncomearr[0] = yIncomearr[0] - tax;
    for (let i = 1; i < yIncomearr.length; i++) {
      yIncomearr[i] = yIncomearr[0] * (i + 1);
    }
  };

  let newtaxregime = () => {
    if (yearlyIncome > 775000 && yearlyIncome <= 1075000) {
      yearlyIncome -= 75000;
      let beforecess = 20000 + (yearlyIncome - 700000) * 0.1;
      tax = beforecess * 0.04 + beforecess;
    } else if (yearlyIncome > 1075000 && yearlyIncome <= 1275000) {
      yearlyIncome -= 75000;
      let beforecess = 20000 + 30000 + (yearlyIncome - 1000000) * 0.15;
      tax = beforecess * 0.04 + beforecess;
    } else if (yearlyIncome > 1275000 && yearlyIncome <= 1575000) {
      yearlyIncome -= 75000;
      let beforecess = 20000 + 30000 + 30000 + (yearlyIncome - 1200000) * 0.2;
      tax = beforecess * 0.04 + beforecess;
    } else if (yearlyIncome > 1575000) {
      yearlyIncome -= 75000;
      let beforecess =
        20000 + 60000 + 30000 + 30000 + (yearlyIncome - 1500000) * 0.3;
      tax = beforecess * 0.04 + beforecess;
    }
    yIncomearr[0] = yIncomearr[0] - tax;
    for (let i = 1; i < yIncomearr.length; i++) {
      yIncomearr[i] = yIncomearr[0] * (i + 1);
    }
  };

  let selectedregime = TaxButton;
  if (selectedregime == "Old Tax" && Apply) {
    oldtaxregime();
  } else if (selectedregime == "New Tax" && Apply) {
    newtaxregime();
  }

  ("TAX");

  for (let i = 0; i < 12; i++) {
    mIncomearr[i] = yIncomearr[i] / 12;
  }

  let statisticsIncome = yIncomearr.slice(0, 12);
  let statisticsInvest = Investarr.slice(0, 12);
  let statisticsReturn = Returnsarr.slice(0, 12);

  const data = {
    Inc: {
      monthly: {
        labels: [...monthlab],
        datasets: [
          {
            label: "Income",
            data: [...mIncomearr],
            backgroundColor: ["rgba(0, 232, 121, 1)"],
            borderColor: ["rgba(0, 232, 121, 1)"],
          },
        ],
      },
      yearly: {
        labels: [...years],
        datasets: [
          {
            label: "Gross Income",
            data: [...statisticsIncome],
            backgroundColor: "rgba(0, 232, 121, 1)",
            borderColor: "rgba(0, 232, 121, 1)",
          },
        ],
      },
    },
    Inv: {
      monthly: {
        labels: [...monthlab],
        datasets: [
          {
            label: "Investments",
            data: [...mInvestarr],
            backgroundColor: ["#1683ff"],
            borderColor: ["#1683ff"],
          },
          {
            label: "Returns",
            data: [...MonthlyReturnsarr],
            backgroundColor: ["rgba(0, 238, 121, 1)"],
            borderColor: ["rgba(0, 232, 121, 1)"],
          },
        ],
      },
      yearly: {
        labels: [...years],
        datasets: [
          {
            label: "Investments",
            data: [...statisticsInvest],
            backgroundColor: ["#1683ff"],
            borderColor: ["#1683ff"],
          },
          {
            label: "Returns",
            data: [...statisticsReturn],
            backgroundColor: ["rgba(0, 238, 121, 1)"],
            borderColor: ["rgba(0, 232, 121, 1)"],
          },
        ],
      },
    },
    Exp: {
      monthly: {
        labels: [...monthlab],
        datasets: [
          {
            label: "Expenses",
            data: [...Expensearr],
            backgroundColor: ["rgba(0, 232, 121, 1)"],
            borderColor: ["rgba(0, 232, 121, 1)"],
          },
        ],
      },
      yearly: {
        labels: [...years],
        datasets: [
          {
            label: "Gross Expenses",
            data: [...Expensearr],
            backgroundColor: "rgba(0, 232, 121, 1)",
            borderColor: "rgba(0, 232, 121, 1)",
          },
        ],
      },
    },
    Res: {
      monthly: {
        labels: [...monthlab],
        datasets: [
          {
            label: "Emergency Fund",
            data: [...Reservearr],
            backgroundColor: ["rgba(0, 232, 121, 1)"],
            borderColor: ["rgba(0, 232, 121, 1)"],
          },
        ],
      },
      yearly: {
        labels: [...years],
        datasets: [
          {
            label: "Gross Reserves",
            data: [...Reservearr],
            backgroundColor: "rgba(0, 232, 121, 1)",
            borderColor: "rgba(0, 232, 121, 1)",
          },
        ],
      },
    },
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
    },
    datalabels: {
      font: {
        weight: "500",
        size: "7vw", // Adjusted for mobile
        anchor: "end",
        offset: -10, // Adjusted for mobile
      },
      display: true,
      color: "black",
      formatter: function (value, context) {
        const label = context.chart.data.labels[context.dataIndex];
        return label ? formatter(value) : "";
      },
      anchor: "end",
      offset: -12, // Adjusted for mobile
      align: "start",
    },
    legend: {
      display: active === "Inv" ? true : false,
      position: 'top',
      labels: {
        usePointStyle: true,
        pointStyle: "rectRounded",
        font: {
          size: 12, // Reduced for mobile
        },
      },
    },
  },
  layout: {
    padding: {
      top: active === "Inv" ? -5 : 10, // Adjusted for mobile
      bottom: 0, // Set to 0 or a smaller value to bring labels closer
    },
  },
  scales: {
    x: {
      stacked: true, // Enable stacking on x-axis
      ticks: {
        font: {
          weight: "bold",
          size:moyear === "Year" ? 7.4 : 8.9, // Adjusted font size for x-axis labels
        },
        padding: 0, // Reduce padding to bring labels closer
      },
      grid: {
        display: false, // Hide x-axis grid lines
      },
      border: {
        display: false, // Hide x-axis border
      },
    },
    y: {
      stacked: true, // Enable stacking on y-axis
      beginAtZero: true,
      margin:{
        top: 52,
      },
      grid: {
        display: false, // Hide y-axis grid lines
      },
      ticks: {
        display: false, // Hide y-axis labels
      },
      border: {
        display: false, // Hide y-axis border
      },
    },
  },
};


  const ctype = () => {
    switch (active) {
      case "Inc":
        return (
          <Bar
            data={moyear === "Month" ? data.Inc.monthly : data.Inc.yearly}
            options={options}
            className="absolute top-[10px]"
          />
        );
        break;
      case "Inv":
        return (
          <Bar
            data={moyear === "Month" ? data.Inv.monthly : data.Inv.yearly}
            options={options}
            className="absolute top-[10px] "
          />
        );
        break;
      case "Exp":
        return (
          <Bar
            data={moyear === "Month" ? data.Exp.monthly : data.Exp.yearly}
            options={options}
            className="absolute top-[10px] "
          />
        );
        break;
      case "Res":
        return (
          <Bar
            data={moyear === "Month" ? data.Res.monthly : data.Res.yearly}
            options={options}
            className="absolute top-[10px] "
          />
        );
        break;

      default:
        return "No Charts to read";
        break;
    }
  };

  return (
    <>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <div className="flex items-end w-full h-[8vh]">
        <div className="flex justify-center rounded-[2vw] w-full h-[5.5vh] bg-[#DCFFEE]"
        onClick={() => {
          setScroll(!Scroll);
        }}
        >
          <div className="flex justify-between items-center h-full w-full max-w-[90vw] px-[4vw]">
            <span className="text-[5vw] md:text-[2.5vw] font-semibold">
              Statistical Trends
            </span>
            <button
              onClick={() => {
                setScroll(!Scroll);
              }}
            >
              <img
                className={`transition-transform duration-300 h-[6vw] md:h-[4vh] w-[6vw] md:w-[4vh] cursor-pointer ${
                  Scroll ? "rotate-0" : "rotate-180"
                }`}
                src={scrollerlink}
                alt="Scroll"
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          Scroll
            ?"opacity-0 max-h-0 translate-y-[-10px]": 
            "opacity-100 max-h-[150vh] translate-y-0"  // Fully expanded
              // Collapsed
        }`}
      >
        <div
          className="flex flex-col items-start p-[4vw] h-[65vh] mt-[3vh] w-full bg-[#DCFFEE] rounded-[2vw] text-start text-[2vh] font-semibold"
          style={{ fontFamily: "Work Sans" }}
        >
          <div className="relative flex text-center justify-evenly items-center h-[5vh] w-full bg-white rounded-[2vw] text-[3.5vw]">
            <div
              className={`absolute left-0 h-full w-1/4 rounded-[2vw] transition-transform duration-300 ${
                active === "Inc"
                  ? "translate-x-0"
                  : active === "Inv"
                  ? "translate-x-full"
                  : active === "Exp"
                  ? "translate-x-[200%]"
                  : active === "Res"
                  ? "translate-x-[300%]"
                  : "translate-x-0"
              }`}
              style={{ backgroundColor: "#71FFBA" }}
            ></div>
            <button
              className="flex items-center justify-center h-full w-full bg-transparent relative z-10 cursor-pointer"
              onClick={() => handleactive("Inc")}
            >
              Income
            </button>
            <button
              className="flex items-center justify-center h-full w-full bg-transparent relative z-10 cursor-pointer"
              onClick={() => handleactive("Inv")}
            >
              Invest
            </button>
            <button
              className="flex items-center justify-center h-full w-full bg-transparent relative z-10 cursor-pointer"
              onClick={() => handleactive("Exp")}
            >
              Expense
            </button>
            <button
              className="flex  items-center justify-center h-full w-full bg-transparent relative z-10 cursor-pointer"
              onClick={() => handleactive("Res")}
            >
              Reserves
            </button>
          </div>
          <span className=" mt-[1vh] opacity-60 text-[1.1vh] w-full text-right">
            {active === "Inv" ? "*Standard NSE returns considered" : ""}
          </span>
          <div className=" absolute top-[11.7vh] ml-2 text-[1.2vh] w-full">
            <span className="opacity-40">*All values are in lac</span>
          </div>
          <div className="relative flex justify-center items-center mt-[5vh] w-full h-[42vh]">
            {ctype()}
          </div>

          <div className="flex gap-[3vw] mt-[3vh] text-[1.8vh] w-full justify-start">
            <button
              onClick={() => {
                setMoyear("Month");
              }}
              className={`${
                moyear === "Month" ? "bg-[#06FF88]" : "bg-[#71FFBA]"
              } flex items-center justify-center h-[4.5vh] w-[25%] rounded-[1vh]`}
            >
              Monthly
            </button>
            <button
              className={`${
                moyear === "Year" ? "bg-[#06FF88]" : "bg-[#71FFBA]"
              } flex items-center justify-center h-[4.5vh] w-[25%] rounded-[1vh]`}
              onClick={() => {
                setMoyear("Year");
              }}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
