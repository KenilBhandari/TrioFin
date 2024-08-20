import React, { useContext, useState } from "react";
import "../../Font.css";
import IncomeContext from "../../Context/IncomeContext";
import { LogarithmicScale } from "chart.js";


function First() {

  


  let { 
      carlink,
      worldlink,
      realtylink,
      homelink,
      scrollerlink,
      lock,
     Income,
     Returns, 
     car, 
     world, 
     house, 
     realty, 
     Finalarr, 
     FinalTrack } =
    useContext(IncomeContext);

  let [Scroll, setScroll] = useState(false);

  function formatter(val) {
    if (val >= 9900000) {
      val = (val / 10000000).toFixed(2);
      return val.endsWith(".00") ? val.slice(0, -1) + " Cr" : val + " Cr";
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(0);
      return val.endsWith(".00") ? val.slice(0, -3) + " Lac" : val + " Lacs";
    } else if (val >= 1000) {
      val = (val / 1000).toFixed(2);
      return val.endsWith(".00") ? val.slice(0, -3) + "K" : val + "K";
    } else {
      return val;
    }
  }

  let Returnarr = Finalarr;

  let calcIncome = Math.round(Finalarr[Returnarr.length - 1]);
  let finalIncome = formatter(calcIncome);
  let suming = "which sums to ";

  if (calcIncome > 10000000) {
    suming += Math.round(calcIncome / 3500000) + " Houses";
  } else if (calcIncome > 500000) {
    suming += Math.round(calcIncome / 1000000) + "  Cars";
  }

  if (Finalarr != undefined || Finalarr != null) {
    for (let i = 0; i < Finalarr.length; i++) {
      if (i === 9 || i === 19 || i === 29 || i === 39) {
        FinalTrack.push(Finalarr[i]);
      }
    }
  }

  let carDate = car && car.length > 0 ? car : [0, 0];
  let worldDate = world && world.length > 0 ? world : [0, 0];
  let houseDate = house && house.length > 0 ? house : [0, 0];
  let realtyDate = realty && realty.length > 0 ? realty : [0, 0];

  let cimg = false,
    wimg = false,
    himg = false,
    rimg = false;
  let cactiveyear = 0,
    wactiveyear = 0,
    hactiveyear = 0,
    ractiveyear = 0;
  let yeararr = [2034, 2044, 2054, 2064];
  let Returntracker = FinalTrack;

  let carworth = [];
  let houseworth = [];
  let worldworth = [];
  let realtyworth = [];

  const recTag = (
    <div className="w-[95px] h-[18px] bg-[#71FFBA] text-[12px] font-semibold rounded-[5px]">
      recommended
    </div>
  );

  for (let i = 0; i < yeararr.length; i++) {
    if (!cimg && carDate[0] <= yeararr[i]) {
      cimg = true;
      cactiveyear = yeararr[i];
    }
    if (!wimg && worldDate[0] <= yeararr[i]) {
      wimg = true;
      wactiveyear = yeararr[i];
    }
    if (!himg && houseDate[0] <= yeararr[i]) {
      himg = true;
      hactiveyear = yeararr[i];
    }
    if (!rimg && realtyDate[0] <= yeararr[i]) {
      rimg = true;
      ractiveyear = yeararr[i];
    }

    carworth.push(Returntracker[i] * 0.6);
    worldworth.push(Returntracker[i] * 0.4);
    houseworth.push(Returntracker[i] * 0.7);
    realtyworth.push(Returntracker[i] * 0.9);
  }

  return (
    <>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <div style={{ fontFamily: "Work Sans" }}>
        {/* Container for flex items */}
        <div className="flex flex-col md:flex-row justify-between w-full md:w-[1212px] h-auto md:h-[192.3px]">
          {/* Total Savings Section */}
          <div className="flex justify-center items-center w-full md:w-[735px] bg-[#DCFFEE] rounded-[22px] mb-4 md:mb-0">
            <div className="flex flex-wrap justify-between items-center h-auto w-full max-w-[695px] p-4">
              <span className="text-[24px] md:text-[40px] font-semibold">
                Total Savings
              </span>
              <span className="text-[24px] md:text-[40px] text-[#09AF60] font-semibold">
                ₹{finalIncome} in 40 years
              </span>
              <br />
              <span className="text-[18px] md:text-[26px] text-[#09AF60] font-semibold">
                {suming}
              </span>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="flex sm:h-[11vh] mb-[-5vw] justify-between items-center w-full md:w-[393px] bg-[#DCFFEE] rounded-[22px] p-4">
            {/* Individual Achievement Divs */}
            <div className="flex flex-col items-center">
              <img className=" w-[40px] h-[40px]" src={carlink} alt="Car" />
              <span className=" text-[13px] md:text-[15px] font-semibold text-[#09AF60] text-center">
                Owing a car
              </span>
            </div>
            <div className="ml-[2vh] flex flex-col items-center">
              <img className="w-[40px] h-[40px]" src={worldlink} alt="World" />
              <span className="text-[12px] md:text-[15px] font-semibold text-[#09AF60] text-center">
                Worldwide tour
              </span>
            </div>
            <div className=" ml-[0.5vh] flex flex-col items-center">
              <img className="w-[40px] h-[40px]" src={homelink} alt="House" />
              <span className="text-[12px] md:text-[15px] font-semibold text-[#09AF60] text-center">
                House ownership
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-[40px] h-[40px]"
                src={realtylink}
                alt="Property"
              />
              <span className="text-[12px] md:text-[15px] font-semibold text-[#09AF60] text-center">
                Property ownership
              </span>
            </div>
          </div>
        </div>

        {/* {"part 1"} */}

        {/* Financial Snapshot Section */}
        <div className="w-full h-fit">
          <div className="flex items-end w-full h-[84px]">
            <div className="flex justify-center  rounded-[2vw] w-full h-[5.5vh] bg-[#DCFFEE]"
            onClick={() => {
              setScroll(!Scroll);
            }}>
              <div className="flex justify-between items-center h-full w-full max-w-[1170px] px-4">
                <span className="text-[20px] md:text-[33px] font-semibold">
                  Financial Snapshot
                </span>
                <button
                  onClick={() => {
                    setScroll(!Scroll);
                  }}
                >
                  <img
                    className={`transition-transform duration-300 h-[25px] md:h-[40px] w-[25px] md:w-[40px] cursor-pointer ${
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
            className={`transition-all duration-300 overflow-hidden flex justify-center items-center ${
              Scroll ? "opacity-0 max-h-[0vw]" : "opacity-100 max-h-[150vh]"
            }`}
          >
            {/* Content for the expanded section */}

            <div className="flex flex-col justify-between w-full md:w-[1144.6px] h-auto  p-4 md:p-0">
              <div className="flex flex-col md:flex-row mt-[1vh] justify-between w-full h-auto md:h-[162.2px] gap-4">
                <div className="w-full md:w-[487.2px]  rounded-[20px] md:rounded-[36px] bg-[#DCFFEE] p-4 md:p-6">
                  <div className="flex items-center h-[3vh] mx-auto md:mx-0">
                    <span className="font-semibold text-[20px] md:text-[25px]">
                      2034
                    </span>
                  </div>

                  <div className=" ml-[2vh]    flex flex-col md:flex-row justify-between  md:h-[115px]">
                    {/* Car Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[70px] w-[49.5px] md:w-[70px] ${
                            cimg && cactiveyear === 2034
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={carlink}
                          alt="Car"
                        />
                        <span className="ml-[5px]">:</span>
                        {cimg && cactiveyear === 2034 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(carworth[0])}
                            </span>
                            {hactiveyear === 2034 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>

                    {/* World Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] p-[4px] md:p-[5px] ${
                            wimg && wactiveyear === 2034
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={worldlink}
                          alt="World"
                        />
                        <span className="ml-[5px]">:</span>
                        {wimg && wactiveyear === 2034 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(worldworth[0])}
                            </span>
                            {cactiveyear === 2034 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>
                    {/* Home Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] ${
                            himg && hactiveyear === 2034
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={homelink}
                          alt="Home"
                        />
                        <span className="ml-[5px]">:</span>
                        {himg && hactiveyear === 2034 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(houseworth[0])}
                            </span>
                            {ractiveyear === 2034 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>

                    {/* Realty Section */}
                    <div className={`flex items-center  `}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] ${
                            rimg && ractiveyear === 2034
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={realtylink}
                          alt="Realty"
                        />
                        <span className="ml-[5px]">:</span>
                        {rimg && ractiveyear === 2034 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(realtyworth[0])}
                            </span>
                            {ractiveyear === 2034 ? (
                              <span className="text-sm">{recTag}</span>
                            ) : null}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* 
{"part 1 "} */}
                <div className="w-full md:w-[487.2px]  rounded-[20px] md:rounded-[36px] bg-[#DCFFEE] p-4 md:p-6">
                  <div className="flex items-center h-[3vh] mx-auto md:mx-0">
                    <span className="font-semibold text-[20px] md:text-[25px]">
                      2044
                    </span>
                  </div>

                  <div className=" ml-[2vh]    flex flex-col md:flex-row justify-between  md:h-[115px]">
                    {/* Car Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[70px] w-[49.5px] md:w-[70px] ${
                            cimg && cactiveyear <= 2044
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={carlink}
                          alt="Car"
                        />
                        <span className="ml-[5px]">:</span>
                        {cimg && cactiveyear <= 2044 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(carworth[1])}
                            </span>
                            {hactiveyear <= 2044 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>

                    {/* World Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] p-[4px] md:p-[5px] ${
                            wimg && wactiveyear <= 2044
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={worldlink}
                          alt="World"
                        />
                        <span className="ml-[5px]">:</span>
                        {wimg && wactiveyear <= 2044 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(worldworth[1])}
                            </span>
                            {cactiveyear <= 2044 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>
                    {/* Home Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] ${
                            himg && hactiveyear <= 2044
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={homelink}
                          alt="Home"
                        />
                        <span className="ml-[5px]">:</span>
                        {himg && hactiveyear <= 2044 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(houseworth[1])}
                            </span>
                            {ractiveyear <= 2044 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>

                    {/* Realty Section */}
                    <div className={`flex items-center  `}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] ${
                            rimg && ractiveyear <= 2044
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={realtylink}
                          alt="Realty"
                        />
                        <span className="ml-[5px]">:</span>
                        {rimg && ractiveyear <= 2044 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(realtyworth[1])}
                            </span>
                            {ractiveyear <= 2044 ? (
                              <span className="text-sm">{recTag}</span>
                            ) : null}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 
{"part 2 "} */}

              <div className="flex flex-col md:flex-row mt-[2vh] justify-between w-full h-auto md:h-[162.2px] gap-4">
                <div className="w-full md:w-[487.2px]  rounded-[20px] md:rounded-[36px] bg-[#DCFFEE] p-4 md:p-6">
                  <div className="flex items-center h-[3vh] mx-auto md:mx-0">
                    <span className="font-semibold text-[20px] md:text-[25px]">
                      2054
                    </span>
                  </div>

                  <div className=" ml-[2vh]    flex flex-col md:flex-row justify-between  md:h-[115px]">
                    {/* Car Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[70px] w-[49.5px] md:w-[70px] ${
                            cimg && cactiveyear <= 2054
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={carlink}
                          alt="Car"
                        />
                        <span className="ml-[5px]">:</span>
                        {cimg && cactiveyear <= 2054 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(carworth[2])}
                            </span>
                            {hactiveyear <= 2054 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>

                    {/* World Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] p-[4px] md:p-[5px] ${
                            wimg && wactiveyear <= 2054
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={worldlink}
                          alt="World"
                        />
                        <span className="ml-[5px]">:</span>
                        {wimg && wactiveyear <= 2054 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(worldworth[2])}
                            </span>
                            {cactiveyear <= 2054 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>
                    {/* Home Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] ${
                            himg && hactiveyear <= 2054
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={homelink}
                          alt="Home"
                        />
                        <span className="ml-[5px]">:</span>
                        {himg && hactiveyear <= 2054 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(houseworth[2])}
                            </span>
                            {ractiveyear <= 2054 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>

                    {/* Realty Section */}
                    <div className={`flex items-center  `}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] ${
                            rimg && ractiveyear <= 2054
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={realtylink}
                          alt="Realty"
                        />
                        <span className="ml-[5px]">:</span>
                        {rimg && ractiveyear <= 2054 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(realtyworth[2])}
                            </span>
                            {ractiveyear <= 2054 ? (
                              <span className="text-sm">{recTag}</span>
                            ) : null}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* 
{"part 3 "} */}
                <div className="w-full md:w-[487.2px]  rounded-[20px] md:rounded-[36px] bg-[#DCFFEE] p-4 md:p-6">
                  <div className="flex items-center h-[3vh] mx-auto md:mx-0">
                    <span className="font-semibold text-[20px] md:text-[25px]">
                      2064
                    </span>
                  </div>

                  <div className=" ml-[2vh]    flex flex-col md:flex-row justify-between  md:h-[115px]">
                    {/* Car Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[70px] w-[49.5px] md:w-[70px] ${
                            cimg && cactiveyear <= 2064
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={carlink}
                          alt="Car"
                        />
                        <span className="ml-[5px]">:</span>
                        {cimg && cactiveyear <= 2064 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(carworth[3])}
                            </span>
                            {hactiveyear <= 2064 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>

                    {/* World Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] p-[4px] md:p-[5px] ${
                            wimg && wactiveyear <= 2064
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={worldlink}
                          alt="World"
                        />
                        <span className="ml-[5px]">:</span>
                        {wimg && wactiveyear <= 2064 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(worldworth[3])}
                            </span>
                            {cactiveyear <= 2064 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>
                    {/* Home Section */}
                    <div className={`flex items-center  mb-[0.7vh] md:mb-0`}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] ${
                            himg && hactiveyear <= 2064
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={homelink}
                          alt="Home"
                        />
                        <span className="ml-[5px]">:</span>
                        {himg && hactiveyear <= 2064 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(houseworth[3])}
                            </span>
                            {ractiveyear <= 2064 ? null : (
                              <span className="text-sm">{recTag}</span>
                            )}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>

                    {/* Realty Section */}
                    <div className={`flex items-center  `}>
                      <div className="flex items-center flex-grow">
                        <img
                          className={`h-[50px] md:h-[60px] w-[50px] md:w-[60px] ${
                            rimg && ractiveyear <= 2064
                              ? "grayscale-0"
                              : "grayscale opacity-50"
                          }`}
                          src={realtylink}
                          alt="Realty"
                        />
                        <span className="ml-[5px]">:</span>
                        {rimg && ractiveyear <= 2064 ? (
                          <div className="flex flex-col ml-[1vh]">
                            <span className="text-[14px] md:text-[18px] font-semibold">
                              worth ₹{formatter(realtyworth[3])}
                            </span>
                            {ractiveyear <= 2064 ? (
                              <span className="text-sm">{recTag}</span>
                            ) : null}
                          </div>
                        ) : (
                          <img
                            className="h-[25px] md:h-[35px] w-[25px] md:w-[35px] ml-[5px]"
                            src={lock}
                            alt="Lock"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default First;
