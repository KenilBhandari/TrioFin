import React, { useContext, useEffect, useState } from "react";
import IncomeContext from "../../Context/IncomeContext";
import First from "../First/First";

function Milestones() {
  const [scroll, setScroll] = useState(false);

  const {
    Returns,
    Income,
    Invest,
    setcar,
    sethouse,
    setworld,
    setrealty,
    Finalarr,
    car,
    world,
    house,
    realty,
    inputLoanValue,
    Fees,
    ChildNum,
    Increment,
    OthExp,
    scrollerlink,
    tips,
  } = useContext(IncomeContext);

  const monthNames = [
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
  let LoanSliced = inputLoanValue.slice(1);
  let Percent = Math.ceil(Income * 12 * 0.02);
  let Othpercent = Income * 12 * 0.04;
  let SlicedOth = OthExp.slice(1);

  const worldTarget = 1200000;
  const carTarget = 900000;
  const houseTarget = 3000000;
  const realtyTarget = 6000000;

  const targets = [carTarget, worldTarget, houseTarget, realtyTarget];

  const calculateMilestoneDates = (Returnarr, targets) => {
    const dates = [0, 0, 0, 0];
    const monthsInYear = 12;

    for (let year = 0; year < Returnarr.length; year++) {
      let yearlyReturn = Returnarr[year];
      let monthlyReturn = yearlyReturn / monthsInYear;
      let currentYear = new Date().getFullYear() + (year + 1);

      for (let month = 0; month < monthsInYear; month++) {
        let accumulatedReturn = monthlyReturn * (month + 1);

        for (let i = 0; i < targets.length; i++) {
          if (!dates[i] && accumulatedReturn >= targets[i]) {
            dates[i] = [currentYear, month + 1];
          }
        }

        if (dates.every((date) => date !== 0)) {
          break;
        }
      }

      if (dates.every((date) => date !== 0)) {
        break;
      }
    }

    return dates;
  };

  useEffect(() => {
    const dates = calculateMilestoneDates(Finalarr, targets);
    setcar(dates[0]);
    setworld(dates[1]);
    sethouse(dates[2]);
    setrealty(dates[3]);
  }, [Income, Invest, Finalarr]);

  const tip = (num) => {
    let tips = [];

    if (LoanSliced >= Percent) {
      tips.push("Take a smaller loan and adjust your plans or spending.");
    }

    if (ChildNum == 4 || ChildNum == 3) {
      tips.push("With more children, you should reduce expense per children.");
    }

    if (Increment >= 25) {
      tips.push("Since your salary is increasing, stay in your job.");
    }

    if (Increment <= 9 && Increment > 0) {
      tips.push(
        "As your salary isn’t improving, consider finding a better job."
      );
    }

    if (SlicedOth > Othpercent) {
      tips.push("Limit your expenses to what your salary can afford.");
    }

    if (Income < 10000) {
      tips.push(
        "Consider higher-paying jobs as you're in the bottom 75% of earners."
      );
      tips.push(
        "Explore opportunities for career advancement or skills enhancement."
      );
      tips.push("Consider relocating to regions with higher income potential.");
      tips.push(
        "Pursue advanced degrees or certifications to qualify for higher-paying roles."
      );
    } else if (Income < 25000 && Income >= 10000) {
      tips.push("Look into part-time work to supplement your income.");
      tips.push("Consider upskilling to increase earning potential.");
      tips.push(
        "Explore income streams like investing in stocks or real estate."
      );
      tips.push(
        "Offer your expertise on a freelance basis to boost your income."
      );
    } else if (Income < 50000 && Income >= 25000) {
      tips.push(
        "Allocate a portion of your income towards long-term investments."
      );
      tips.push("Consider diversifying your investments to low risk.");
      tips.push(
        "Review your budget regularly to optimize savings and investment."
      );
      tips.push(
        "Keep up with financial news to make informed investment decisions."
      );
    } else if (Income >= 50000) {
      tips.push("Explore opportunities to invest in businesses or startups.");
      tips.push(
        "Consider hiring financial advisors for portfolio optimization."
      );
      tips.push(
        "Contribute to charities or nonprofits as part of your financial planning."
      );
      tips.push(
        "Invest in emerging businesses or startups with high growth potential."
      );
    }

    return tips[num];
  };

  return (
    <>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <div 
      style={{ fontFamily: "Work Sans" }}>
        <div className="flex flex-col items-center rounded-[2vw] w-full h-auto bg-[#DCFFEE]"
        onClick={() => {
          setScroll(!scroll);
        }}>
          <div className="flex justify-between items-center h-auto w-full max-w-[90vw] px-4 py-2">
            <span className="text-[5vw] md:text-[2.5vw] font-semibold">
              Financial Milestones
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
            scroll ? "opacity-0 max-h-[30px]" : "opacity-100 max-h-[150vh]"
          }`}
        >
          <div className="flex flex-col items-center text-start w-full">
            <div className="flex flex-col sm:flex-row justify-center items-center bg-[#DCFFEE] rounded-[24px] sm:rounded-[36px] w-full py-4 mt-[5vw]">
              <div className="w-[68vw] sm:px-0 ">
                <ol type="1" className="list-disc space-y-2 text-start">
                  <li className="text-[#09AF60] text-[16px] custom-tip sm:text-[20px] md:text-[24px] lg:text-[30px] font-semibold">
                    {car &&
                      `${monthNames[car[1] - 1]} ${car[0]} : Purchasing a Car`}
                  </li>
                  <li className="text-[#09AF60] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[30px] font-semibold">
                    {world &&
                      `${monthNames[world[1] - 1]} ${
                        world[0]
                      } : Travelling World`}
                  </li>
                  <li className="text-[#09AF60] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[30px] font-semibold">
                    {house &&
                      `${monthNames[house[1] - 1]} ${
                        house[0]
                      } : Purchasing a House`}
                  </li>
                  <li className="text-[#09AF60] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[30px] font-semibold">
                    {realty &&
                      `${monthNames[realty[1] - 1]} ${
                        realty[0]
                      } : Realty Investments`}
                  </li>
                </ol>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[32px] ml-[4vw] font-semibold mt-[20px] md:mt-[35px]">
                Tips
              </span>

              <div className="flex flex-col items-center w-full mt-2 ml-[3vw]">
                <div className="space-y-4 w-[84vw] max-w-[1100px]">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="flex">
                      <img
                        className="h-[25px] w-[25px] sm:h-[36px] sm:w-[36px] md:h-[47px] md:w-[47px]"
                        src={tips}
                        alt=""
                      />
                      <span className=" sm:ml-[10px] ml-[2vw] md:ml-[20px] mt-[0.1vw] text-[15px] sm:text-[25px] md:text-[24px] lg:text-[30px] font-semibold">
                        {tip(index)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="h-[80px] sm:h-[100px] md:h-[200px]"></div>
        </div>
      </div>
    </>
  );
}

export default Milestones;
























