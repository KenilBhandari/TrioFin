import React, { useContext, useState } from "react";
import "../../Font.css";
import Ovcard from "./Ovcard";
import IncomeContext from "../../Context/IncomeContext";

function Overview() {
  const [scroll, setScroll] = useState(false);
  let {
    Income,
    Invest,
    setInvest,
    Expense,
    setExpense,
    Reserve,
    calculateExpense,
    calculateReserve,
    setReserve,
    scrollerlink
  } = useContext(IncomeContext);

  const Investpercent = ((Invest / Income) * 100).toFixed(1);
  const Expensepercent = ((Expense / Income) * 100).toFixed(1);
  const Reservepercent = ((Reserve / Income) * 100).toFixed(1);
  return (
    <>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <div className="h-max ">
        <div
          className={`transition-all duration-200 ease-in-out ${
            scroll ? "max-h-[84px]" : "max-h-[1390px] opacity-100"
          }`}
          style={{ fontFamily: "Work Sans" }}
        >
          <div className="flex flex-col items-center rounded-[2vw] w-full h-auto bg-[#DCFFEE]"
             onClick={() => {
              setScroll(!scroll);
            }}>
            <div className="flex justify-between items-center h-auto w-full max-w-[90vw] px-4 py-2">
              <span className="text-[5vw] md:text-[2.5vw] font-semibold">
                Overview
              </span>
              <button
                onClick={() => {
                  setScroll(!scroll);
                }}
                className="flex items-center justify-center"
              >
                <img
                  className={`transition-transform duration-300 h-[6vw] md:h-[4vh] w-[6vw] md:w-[4vh] cursor-pointer ${
                    scroll ? "rotate-0" : "rotate-180"
                  }`}
                  src={scrollerlink}
                  alt="Scroll"
                />
              </button>
            </div>
          </div>

          <div
            className={`transition-all duration-300 overflow-hidden flex flex-col items-center ${
              scroll ? "opacity-0 max-h-[3vh]" : "opacity-100 max-h-[150vh]"
            }`}
          >
            <div className="w-full flex flex-col  px-4 py-2">
              <span className="font-semibold text-[24px] md:text-[3vw] mb-4 mr-[52vw]">
                Income
              </span>
              <div className="flex items-center w-full">
                <Ovcard
                  period="monthly"
                  amount={"₹" + Income}
                  year={2034}
                  percent={100}
                />
                <Ovcard
                  period="yearly"
                  amount={"₹" + Income * 12}
                  year={2034}
                  percent={100}
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-center px-4 py-2">
              <span className="font-semibold text-[24px] md:text-[3vw] mb-4 mr-[37.5vw]">
                Investments
              </span>
              <div className="flex  items-center w-full ">
                <Ovcard
                  period="monthly"
                  amount={"₹" + Invest.toFixed(0)}
                  year={2044}
                  percent={Investpercent}
                />
                <Ovcard
                  period="yearly"
                  amount={"₹" + Invest.toFixed(0) * 12}
                  year={2044}
                  percent={Investpercent}
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-center px-4 py-2">
              <span className="font-semibold text-[24px] md:text-[3vw] mb-4  mr-[49.5vw]">
                Expense
              </span>
              <div className="flex  items-center w-full ">
                <Ovcard
                  period="monthly"
                  amount={"₹" + Expense.toFixed(0)}
                  year={2054}
                  percent={Expensepercent}
                />
                <Ovcard
                  period="yearly"
                  amount={"₹" + Expense.toFixed(0) * 12}
                  year={2054}
                  percent={Expensepercent}
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-center px-4 py-2">
              <span className="font-semibold text-[24px] w-[58vw] md:text-[3vw] mb-4 mr-[22vw]">
                Emergency Funds
              </span>
              <div className="flex mb-[3vh] items-center w-full ">
                <Ovcard
                  period="monthly"
                  amount={"₹" + Reserve.toFixed(0)}
                  year={2064}
                  percent={Reservepercent}
                />
                <Ovcard
                  period="yearly"
                  amount={"₹" + Reserve.toFixed(0) * 12}
                  year={2064}
                  percent={Reservepercent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
