import React, { useContext, useEffect } from "react";
// import "../App.css";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import IncomeContext from "../Context/IncomeContext";

const Preferences = () => {
  
  const [Scroll, setScroll] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("None");

  const [isTaxOpen, setTaxIsOpen] = useState(false);

  const [ToggleTaxbtn, setToggleTaxbtn] = useState(false);
 

  const toggleDropdown = () => setIsOpen(!isOpen);
  const TaxDropdown = () => setTaxIsOpen(!isTaxOpen);
  const handleTaxToggle = () => setToggleTaxbtn(!ToggleTaxbtn);
  
  const [openDatePicker, setOpenDatePicker] = useState(false);
  
  

  let {
    scrollerlink,
    datepicker,
    child,
    Income,
    setIncome,
    TaxButton,
    setTaxButton,
    date,
    setDate,
    inputLoanValue,
    setInputLoanValue,
    setFees,
    Fees,
    ChildNum,
    setChildNum,
    inflationRate,
    setInflationRate,
    Increment,
    setIncrement,
    OthExp,
    setOthExp,
    Apply,
    setApply,
    
  } = useContext(IncomeContext);

  const loanrupee = (e, setInputValue, currencySymbol = "₹") => {
    let value = e.target.value;
    if (value === "" || value == 0) {
      setInputValue("");
      return;
    }
    let numericValue = value.replace(/\D/g, "");
    let percent = Math.ceil(Income * 12 * 0.02);

    if (numericValue < percent) {
      setInputValue(currencySymbol + numericValue);
    } else {
      setInputValue(currencySymbol + percent);
    }
  };
  const handleCalendarClick = () => {
    setOpenDatePicker(true); // Open the DatePicker
  };

  const rupee = (e, setInputValue, type, currencySymbol = "₹") => {
    let value = e.target.value;
    let numericValue = value.replace(/\D/g, "");
    let percent = 0;

    if (value === "" || value == 0) {
      setInputValue("");
      return;
    }
    if (type == "cFees") {
      percent =Math.ceil(Income * 12 * 0.59);
    } else if (type == "Oth") {
      percent = Math.ceil(Income * 12 * 0.04);
    }
    if (numericValue < percent) {
      setInputValue(currencySymbol + numericValue);
    } else {
      setInputValue(currencySymbol + percent);
    }
  };

  const CalendarIcon =  (
    <img
      className="h-10 w-10 translate-x-[-10px]"
      src={datepicker}
      alt="Calendar"
    />
  );

  const Cal = (  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      format="DD/MM/YYYY"
      minDate={dayjs("2025-01-01")}
      maxDate={dayjs("2062-12-31")}
      slots={{ openPickerIcon: CalendarIcon }}
      slotProps={{
        textField: {
          placeholder: "Loan Expiry",
          inputProps: {
            style: {
              fontSize: "16px",
              sm: { fontSize: "18px" },
              md: { fontSize: "20px" },
              fontWeight: 700,
              color: "#09AF60",
            },
          },
        },
      }}
      value={date}
      onChange={(newDate) => setDate(newDate)}
    />
  </LocalizationProvider>)

  const handleLoan = (e) => {
    loanrupee(e, setInputLoanValue);
  };

  const handleFees = (e) => {
    rupee(e, setFees, "cFees");
  };

  const handleButtonClick = (imgs) => {
    const images = Array(imgs).fill(childimg);
    imgs === "None" ? setSelectedButton(false) : setSelectedButton(images);
    setIsOpen(false);
    imgs === "None" ? (ChildNum = !ChildNum) : (ChildNum = images.length);
    setChildNum(ChildNum);
  };

  const handleApply = () => {
    // setScroll(!Scroll);

    if (
      (inputLoanValue && date) ||
      (ChildNum && Fees) ||
      Increment ||
      OthExp ||
      inflationRate ||
      TaxButton
    ) {
      if ((!ChildNum && Fees) || (ChildNum && !Fees)) {
        setApply(false);
      } else if ((!inputLoanValue && date) || (inputLoanValue && !date)) {
        setApply(false);
      } else {
        setApply(!Apply);
      }
    } else {
      setApply(false);
    }
  };

  const childimg = (
    <img src={child} alt="Button 2" className="inline w-[6vw] h-[3vh] " />
  );

  const toggleTaxbutton = (
    <label className="inline-flex  items-center cursor-pointer">
      <input
        type="checkbox"
        onClick={handleTaxToggle}
        value=""
        className="sr-only peer"
      />
      <div className="relative w-[11vw] h-[3vh]  bg-gray-200 rounded-full peer peer-focus:ring-10 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[2.5vh] after:w-[5vw] after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );

  

  const handleTax = (tax) => {
    tax === "New" ? setTaxButton("New Tax") : "";
    setTaxIsOpen(false);
    tax === "Old" ? setTaxButton("Old Tax") : "";
    return tax;
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const handleInflation = (e) => {
    const value = e.target.value;
    if (Income < 25000) {
      if (value.length <= 1 && /^[1-7]?$/.test(value)) {
        setInflationRate(value);
      } else {
        setInflationRate(7);
      }
    } else if (Income >= 25000) {
      if (value.length <= 1 && /^[1-9]?$/.test(value)) {
        setInflationRate(value);
      } else {
        setInflationRate(9);
      }
    }
  };

  const handleIncrement = (e) => {
    const value = e.target.value;
    if (
      value === "" ||
      (value.length <= 2 && /^[1-9]$|^[1-4][0-9]$|^50$/.test(value))
    ) {
      setIncrement(value);
    } else {
      setIncrement(50);
    }
  };

  const handleOthExp = (e) => {
    rupee(e, setOthExp, "Oth");
  };

  useEffect(() => {
    ToggleTaxbtn ? "" : setTaxButton("Tax Plan") || setTaxIsOpen(false);

  }, [ToggleTaxbtn]);

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      {/* Financial Snapshot Section */}
      <div className={`w-full h-auto ${Scroll ? "": "mb-[3vw]"}`}>
        <div className="flex items-end w-full h-[8vh] ">
          <div className="flex justify-center  rounded-[2vw] w-full h-[5.5vh] bg-[#DCFFEE]"
          onClick={() => {
            setScroll(!Scroll);
          }}>
            <div className="flex justify-between items-center h-full w-full max-w-[90vw] px-[4vw]">
              <span className="text-[5vw] md:text-[2.5vw] font-semibold">
                Set Preferences
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
          {/* Content goes here */}

          <div className="flex flex-col  items-center justify-center w-full p-4 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Loan Section */}
            <div className="flex flex-wrap items-center justify-between w-full">
  <div className="flex text-[24px] sm:text-[28px] md:text-[33px] font-semibold w-full sm:w-[150px] mb-2 sm:mb-0">
    Loan
  </div>

  <div className="flex w-[-18vw] sm:w-auto sm:flex-nowrap items-center space-x-0 sm:space-x-4">
    <div className="flex h-[4.15vh] gap-[4vw] sm:h-[50px] w-[-15vh] sm:w-[50vh]">
      <input
        placeholder="EMI"
        className={`w-[35vw] text-start rounded-[7px] pl-[12px] placeholder-[#09AF60] placeholder-opacity-70 h-full text-[20px] sm:text-[25px] md:text-[28px] text-[#09AF60] font-semibold bg-[#C6FFE3] focus:outline-none
          ${inputLoanValue.slice(1) >= Income * 12 * 0.02 ? "animate-wiggles border-[3px] border-[#1E90FF]" : ""}
          ${!inputLoanValue && date ? "animate-wiggle border-[2.5px] border-red-400" : ""}
        `}
        type="text"
        onChange={handleLoan}
        value={inputLoanValue}
      />
      
      <div
        className={`flex rounded-[7px] items-center ml-[0.8vh] overflow-hidden bg-[#C6FFE3] h-[4.15vh] sm:h-[50px] w-[35vw] sm:w-[150px]
          ${!date && inputLoanValue ? "animate-wiggle border-[2.5px] border-red-400" : ""}
        `}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            open={openDatePicker} // Control the open state
            onClose={() => setOpenDatePicker(false)} // Close when the picker is closed
            format="DD/MM/YYYY"
            minDate={dayjs("2025-01-01")}
            maxDate={dayjs("2062-12-31")}
            slots={{ openPickerIcon: CalendarIcon }}
            slotProps={{
              textField: {
                placeholder: "Loan Expiry",
                inputProps: {
                  style: {
                    fontSize: "0.9rem",
                    sm: { fontSize: "15px" },
                    md: { fontSize: "20px" },
                    fontWeight: 700,
                    color: "#09AF60",
                  },
                },
              },
            }}
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </LocalizationProvider>
        <span>
          <img
            className="h-[7vw] w-[13vw] translate-x-[-10px]"
            src={datepicker}
            alt="Calendar"
            onClick={handleCalendarClick} // Open DatePicker on click
          />
        </span>
      </div>
    </div>
  </div>
</div>


            {/* Children Section */}
            <div className="flex flex-wrap items-center justify-between w-full">
              <div className="flex text-[24px] sm:text-[28px] md:text-[33px] font-semibold w-full sm:w-[150px] mb-2 sm:mb-0">
                Children
              </div>

              <div className="flex w-full sm:w-auto gap-[1.5vw]  sm:flex-nowrap items-center space-x-0 sm:space-x-4">
                <div className="relative h-[45px]   sm:h-[50px] w-full sm:w-[150px]">
                  <div
                    className={`flex rounded-[7px]    w-[35vw] text-start pl-3 placeholder-[#6ef6b4] placeholder-opacity-70 h-[4.15vh] text-[20px] sm:text-[25px] md:text-[28px] text-[#09AF60] font-semibold bg-[#C6FFE3] focus:outline-none items-center cursor-pointer
          ${
            selectedButton === "" ||
            selectedButton === "None" ||
            selectedButton === false
              ? "opacity-60"
              : "opacity-100"
          }
          ${
            Fees && !ChildNum
              ? "animate-wiggle border-[2.5px] border-red-400"
              : ""
          }`}
                    onClick={toggleDropdown}
                  >
                    {selectedButton || "None"}
                    <img
                      className={`absolute h-4 w-4 sm:h-6 sm:w-6 right-[7vw] ${
                        isOpen ? "rotate-180" : "rotate-270"
                      }`}
                      src={scrollerlink}
                      alt="ScrollDown"
                    />
                  </div>
                  {isOpen && (
                    <div className="absolute bg-[#C6FFE3] shadow-md z-10 mt-1 w-[35vw]">
                      <button
                        className="w-full px-3 py-1 hover:bg-green-300 flex text-[18px] sm:text-[20px] md:text-[25px] items-center"
                        onClick={() => handleButtonClick("None")}
                      >
                        None
                      </button>
                      <hr />
                      <button
                        className="w-full text-left px-3 py-1 hover:bg-green-300 flex items-center"
                        onClick={() => handleButtonClick(1)}
                      >
                        {childimg}
                      </button>
                      <hr />
                      <button
                        className="w-full text-left px-3 py-1 hover:bg-green-300 flex"
                        onClick={() => handleButtonClick(2)}
                      >
                        {childimg}
                        {childimg}
                      </button>
                      <hr />
                      <button
                        className="w-full text-left px-3 py-1 hover:bg-green-300 flex items-center"
                        onClick={() => handleButtonClick(3)}
                      >
                        {childimg}
                        {childimg}
                        {childimg}
                      </button>
                      <hr />
                      <button
                        className="w-full text-left px-3 py-1 hover:bg-green-300 flex items-center"
                        onClick={() => handleButtonClick(4)}
                      >
                        {childimg}
                        {childimg}
                        {childimg}
                        {childimg}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex rounded-[7px]  items-center h-[45px] sm:h-[50px] w-full sm:w-[150px] ">
                  <input
                    placeholder="Fees"
                    className={`w-[35vw] text-start pl-[12px] sm:pl-[14px] rounded-[7px] placeholder-[#09AF60] placeholder-opacity-70 h-[4.15vh] text-[20px]  mb-[1.2vh]  sm:text-[25px] md:text-[28px] text-[#09AF60] font-semibold bg-[#C6FFE3] focus:outline-none
          ${
            Fees.slice(1) >= Income * 12 * 0.59
              ? "animate-wiggles  border-[3px] border-[#1E90FF]"
              : ""
          }
          ${
            !Fees && ChildNum
              ? "animate-wiggle border-[2.5px] border-red-400"
              : ""
          }`}
                    type="text"
                    onChange={handleFees}
                    value={Fees}
                  />
                </div>
              </div>
            </div>
          </div>

        
          <div className="flex flex-col pl-4 pr-[6.5vw] pb-4 ">
            {/* Inflation Section */}
            <div className="flex sm:flex-row items-center justify-between w-full relative">
              {/* Inflation Label and Button */}
              <div className="flex items-center  text-[24px] gap-[2vw]  sm:text-[33px] font-semibold  sm:w-auto">
                <span>Inflation</span>
                
              </div>

              {/* Inflation Input and Percentage */}
              
                 <input
                    placeholder="Inflation"
                    className={`text-start rounded-[7px] pl-[12px] custom-inflation mr-[-24.3vw] placeholder-[#09AF60] placeholder-opacity-70 h-[4.15vh] w-[35vw] text-[20px] sm:text-[25px] md:text-[28px] text-[#09AF60] font-semibold bg-[#C6FFE3] focus:outline-none
                      ${
                        (Income < 25000 && inflationRate == 7) ||
                        (Income >= 25000 && inflationRate == 9)
                          ? "animate-wiggles border-[2px] border-[#1E90FF]"
                          : ""
                      }`}
                    type="text"
                    onChange={handleInflation}
                    value={inflationRate}
                  />
                <span className="text-[20px] text-[#09AF60] font-semibold mr-[3vw] sm:text-[33px] ">%</span>
              </div>
         
          </div>

          <div className="flex flex-col mt-[1vh] pl-4 pr-[6.5vw] pb-4">
            {/* Increment Section */}
            <div className="flex sm:flex-row items-center justify-between w-full relative">
              {/* Increment Label */}
              <div className="flex items-center text-[24px] gap-[2vw] sm:text-[33px] font-semibold sm:w-auto">
                <span>Increment</span>
              </div>

              {/* Increment Input and Percentage */}
              
                <input
                    placeholder="Raise"
                    className={`text-start rounded-[7px] custom-increment pl-[12px] mr-[-19.8vw] placeholder-[#09AF60] placeholder-opacity-70 h-[4.15vh] w-[35vw] text-[20px] sm:text-[25px] md:text-[28px] text-[#09AF60] font-semibold bg-[#C6FFE3] focus:outline-none
                      ${
                        Increment == 50
                          ? "animate-wiggles border-[2px] border-[#1E90FF] "
                          : ""
                      }`}
                    type="text"
                    onChange={handleIncrement}
                    value={Increment}
                  />
                <span className="text-[20px] text-[#09AF60] font-semibold mr-[3vw] sm:text-[33px] ">%</span>
              
            </div>
          </div>

          <div className="flex flex-col mt-[1vh] pl-4 pr-[6.5vw] pb-4">
            <div className="flex sm:flex-row items-center justify-between w-full relative">
              {/* Label */}
              <div className="flex items-center text-[24px] gap-[2vw] sm:text-[33px] font-semibold sm:w-auto">
                Extra Costs
              </div>

              {/* Input and Percentage */}
              <input
                    placeholder="Expenses"
                    className={`  text-start rounded-[7px] pl-[12px] custom-expense   placeholder-[#09AF60] placeholder-opacity-70 h-[4.15vh] w-[35vw] text-[20px] sm:text-[25px] md:text-[28px] text-[#09AF60] font-semibold bg-[#C6FFE3] focus:outline-none
         ${
                  OthExp.slice(1) >= Income * 12 * 0.04
                    ? "animate-wiggles border-[3px] border-[#1E90FF] "
                    : ""
                }`}
                    type="text"
                    onChange={handleOthExp}
                    value={OthExp}
                  />
            </div>
          </div>


          <div className="flex flex-col pl-4 pr-[6.5vw] mt-[1vh] pb-4 w-full">
            {/* Tax Section */}
            <div className="flex sm:flex-row items-start justify-between w-full relative">
              {/* Tax Label and Button */}
              <div className="flex mb-2 items-center gap-[2vw] text-[24px] sm:text-[33px] font-semibold w-full sm:w-auto">
                <span>Tax</span>
                {toggleTaxbutton}
              </div>

              {/* Tax Dropdown */}
              <div className="flex flex-col sm:w-[440px] relative">
                <div
                  className={`flex rounded-[7px]  custom-tax text-start h-[4.15vh] w-[35vw] pl-3 placeholder-[#9faaa5] placeholder-opacity-70 text-[20px] sm:text-[33px] text-[#09AF60] font-semibold bg-[#C6FFE3] focus:outline-none items-center cursor-pointer ${
                    ToggleTaxbtn
                      ? "opacity-100"
                      : "pointer-events-none opacity-50"
                  }`}
                  onClick={TaxDropdown}
                >
                  {TaxButton}
                  <img
                    className={`absolute right-[4vw] h-4 w-4 transition-transform ${
                      isTaxOpen ? "rotate-180" : "rotate-0"
                    }`}
                    src={scrollerlink}
                    alt="ScrollDown"
                  />
                </div>

                {/* Dropdown Menu */}
                {isTaxOpen && (
                  <div className="absolute top-full  left-0 bg-[#82f1bc] shadow-md z-10  w-[35vw]">
                    <hr />
                    <hr />
                    <button
                      className="w-full text-left px-3 py-1 text-[20px] sm:text-[25px] hover:bg-green-300 flex items-center"
                      onClick={() => handleTax("New")}
                    >
                      New Tax
                    </button>
                    <hr />
                    <hr />
                    <button
                      className="w-full text-left px-3 py-1 text-[20px] sm:text-[25px] hover:bg-green-300 flex items-center"
                      onClick={() => handleTax("Old")}
                    >
                      Old Tax
                    </button>
                    <hr />
                    <hr />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex mt-[1vh] items-center justify-center w-full">
          <button
  className={`flex items-center justify-center rounded-lg text-[4.5vw] sm:text-[20px] font-semibold w-[22vw] h-[5vh] transition-colors duration-300 ease-in-out ${
    Apply
      ? "bg-[#E0F7FF] border-[2px] border-[#1E90FF] text-[#1E90FF] hover:bg-[#d0e9f9] hover:border-[#1E90FF] hover:text-[#000000] shadow-md"
      : "bg-[#C6FFE3] border-[2px] border-[#A0D6A8] text-[#2F8F2F] hover:bg-[#b1f1d0] hover:border-[#8BDC8C] hover:text-[#000000] shadow-md"
  }`}
  onClick={handleApply}
>
  {Apply ? "Undo" : "Apply"}
</button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Preferences;
