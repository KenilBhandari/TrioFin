import React, { useState, useContext } from "react";
import First from "../First/First";
import Statistics from "../Statistics/Statistics";
import Track from "../Track/Track";
import Overview from "../Overview/Overview";
import Milestones from "../Milestones/Milestones";
import Preferences from "../../Preferences/Preferences";
import "../../Font.css";
import IncomeContext from "../../Context/IncomeContext";

import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

function Input() {
  const cld = new Cloudinary({ cloud: { cloudName: "dc7ddfmi2" } });
  const LogoCdn = cld
    .image("TrioFin/bu1twlokglgsuzvq3d5k")
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500));
  const Logo = LogoCdn.toURL();

  const [moveup, setMoveup] = useState(false);
  const [Inc, setInc] = useState("");
  const [reload, setReload] = useState(0); // State to trigger re-render

  let { setIncome } = useContext(IncomeContext);

  const allContent = (
    <div className="h-[110vh]">
      <First />
      <Preferences />
      <Statistics />
      <Track />
      <Overview />
      <Milestones />

      <div className="h-[7vh] w-full flex items-center justify-center">
        <span className="text-[24px] font-semibold">
          Made with ❤️ by Trio Group
        </span>
      </div>
    </div>
  );

  const rupee = (e, setInputValue, currencySymbol = "₹") => {
    let value = e.target.value;
    let numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters

    // If the value exceeds 10 lakh, set it to 10 lakh
    if (parseInt(numericValue) > 1000000) {
      numericValue = "1000000";
    }

    if (value === "" || value == 0) {
      setInputValue("");
      return;
    } else {
      setInputValue(currencySymbol + numericValue);
    }
  };

  const handleIncome = (e) => {
    rupee(e, setInc);
  };

  const setter = () => {
    setIncome(Inc.slice(1)); // Remove the currency symbol when setting the income
  };

  const handleLogoClick = () => {
    setReload((prev) => prev + 1); // Trigger re-render by updating the state
    setMoveup(false); // Reset the moveup state
    setInc(""); // Reset the income input
  };

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <body className={`${moveup ? "mt-[48vh]" : ""}`}>
        <div
          key={reload} // Ensure the component re-renders completely
          className={`transition-transform duration-500 ${
            moveup ? "translate-y-[-10vh]" : "translate-y-[0px]"
          }`}
        >
          <div className="h-[70vh] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center" onClick={handleLogoClick}>
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-[15vw] w-[15vw] max-w-[60px] max-h-[60px] "
                />

                <span
                  className="font-bold pl-2 text-[8vw] md:text-[40px]"
                  style={{ fontFamily: "Montserrat" }}
                >
                  TrioFin
                </span>
              </div>
              <input
                className={`mt-5 w-[80vw] bg-[#ffffff] max-w-[500px] h-[14.24vw] max-h-[60px] border-[0.8vw] rounded-[10px] 
                            focus:outline-none text-[#09AF60] placeholder-[#9cccb5] font-semibold text-[7vw] md:text-[24px] 
                            indent-[5vw] md:indent-[20px] 
                            ${
                              Inc && parseInt(Inc.slice(1)) <= 5000
                                ? "animate-wiggles border-[0.8vw] border-red-400"
                                : parseInt(Inc.slice(1)) === 1000000
                                ? "animate-wiggles border-[0.8vw] border-[#1E90FF]"
                                : "border-custom-green"
                            }`}
                type="text"
                style={{ fontFamily: "Work Sans" }}
                placeholder="Enter your income..."
                onChange={handleIncome}
                value={Inc}
              />

              <button
                className={`
    border-[2px] border-custom-green rounded-full 
    ${
      Inc && parseInt(Inc.slice(1)) > 5000
        ? "bg-[#afffbb] opacity-100 cursor-pointer button-shadow"
        : "bg-[#d9fafa] opacity-70 cursor-default"
    }
    h-[8vh] max-h-[12vh] w-[50vw] max-w-[65vw] 
    text-[4vw] md:text-[24px] mt-[18%] relative overflow-hidden
    transition-all before:absolute before:top-1/2 before:left-1/2 before:h-0 before:w-0 
    p-2 items-center justify-center
    ${moveup ? "translate-y-[-3vh]" : "translate-y-[0px]"}
  `}
                style={{ fontFamily: "Nunito" }}
                onClick={() => {
                  if (Inc && parseInt(Inc.slice(1)) > 5000) {
                    setter();
                    setMoveup(true);
                  }
                }}
                disabled={!Inc || parseInt(Inc.slice(1)) <= 5000}
              >
                <span className="absolute top-1/2 left-1/2 text-[3vh] transform -translate-x-1/2 -translate-y-1/2">
                  Generate
                </span>
              </button>

              <div>{moveup ? allContent : null}</div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Input;
