import React, { createContext, useContext, useEffect, useState } from "react";
import IncomeContext from "./IncomeContext";


import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const IncomeContextProvider = ({ children }) => {

  const cld = new Cloudinary({ cloud: { cloudName: 'dc7ddfmi2' } });

  const CarCdn = cld.image('TrioFin/llrul6uffuc8911dcbcg').format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));
  const carlink = CarCdn.toURL();
  const WorldCdn = cld.image('TrioFin/ngh7cijbxl1krnji2yo8').format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));
  const worldlink = WorldCdn.toURL();
  const HouseCdn = cld.image('TrioFin/szevduenuxhu89htnhgt').format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));
  const homelink = HouseCdn.toURL();
  const RealtyCdn = cld.image('TrioFin/wxt2iacp3a102cqxx8pz').format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));
  const realtylink = RealtyCdn.toURL();
  const LockCdn = cld.image('TrioFin/zhdgga3ixihtexsxxzgw').format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));
  const lock = LockCdn.toURL();
  const ScrollerCdn = cld.image('TrioFin/ek07edht1ir6ytaejgai').format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));
  const scrollerlink = ScrollerCdn.toURL();
  const DateCdn = cld.image('TrioFin/nwrika6oxsdun2fwgnbj').format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));
  const datepicker = DateCdn.toURL();

  const ChildCdn = cld.image('TrioFin/uvkquxx5qirsnzsjvkcs').format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(200).height(200));
  const child = ChildCdn.toURL();
  useEffect(() => {
    fetch(child).then((response) => {
      if (response.ok) {
        // Image has been prefetched successfully
      }
    });
  }, [child]);

  const TipsCdn = cld.image('TrioFin/sbg9gxdiohv3qcwt5yw0').format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));
  const tips = TipsCdn.toURL();



  
  const [Income, setIncome] = useState(6000);

  const [Invest, setInvest] = useState(60);
  const [Expense, setExpense] = useState(30);
  const [Reserve, setReserve] = useState(10);
  const [accumulatedReturn,setaccumulatedReturn] = useState(0)

  const [car,setcar] = useState([])
  const [world,setworld] = useState(null)
  const [house,sethouse] = useState(null)
  const [realty,setrealty] = useState(null)
  const Returnarr = []
  const [Finalarr,setFinalarr] = useState(Returnarr)
  const FinalTrack = []
  
  const [date, setDate] = useState(null);
  const [inputLoanValue, setInputLoanValue] = useState("");
  const [Fees,setFees] = useState("")
  const [ChildNum, setChildNum] = useState(0)
  const [TaxButton, setTaxButton] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [Increment,setIncrement] = useState("")
  const [OthExp,setOthExp] = useState("")
  const [Apply,setApply] = useState(false)
  

  function calculateExpense(income) {
    const minIncome = 10000;
    const maxIncome = 500000;
    const minExpense = 5000;
    const maxExpense = 30000;

    const incomeRange = maxIncome - minIncome;
    const expenseIncrementPerIncome = (maxExpense - minExpense) / incomeRange;
    let expense = minExpense + (income - minIncome) * expenseIncrementPerIncome;

    if (income <= 5000 && income) {
      expense = Math.max(3000, income * 0.75);
    } else if (income < 7000) {
      expense = Math.max(3500, income * 0.6);
    } else if (income < 9473) {
      expense = Math.max(4000, income * 0.45);
    } else if (income > 500000) {
      expense = 30000;
    }
    return expense;
  }

  function calculateReserve(income) {
    const minIncome = 5000;
    const maxIncome = 50000;
    const startReservePercentage = 0.1;
    const endReservePercentage = 0.06;
    const ResRange = maxIncome - minIncome;
    const reservePercentageDecrement =
      (startReservePercentage - endReservePercentage) / ResRange;

    let reserve =(startReservePercentage - (income - minIncome) * reservePercentageDecrement) * income;
    if (income > 50000) {
      reserve = 3000;
    } else if (Income < 5000) {
      reserve = Math.max(300, Income * 0.1);
    } else if (Income < 7000) {
      reserve = Math.max(500, Income * 0.1);
    } else if (Income < 9473) {
      reserve = Math.max(800, Income * 0.1);
    }
    return reserve;
  }

  
  const Returns = (num) =>{
    const Returnarr = []
    const Returntrack = []
    let yror = 12/100
    let mror = yror/12

    for (let i = 1; i <= 40; i++) {
      let period = i*12
      let yReturn = Invest * ((Math.pow(1 + mror, period) - 1) / mror) * (1 + mror);
      Returnarr.push(yReturn);
      if (i === 10 || i === 20 || i === 30 || i === 40){
        Returntrack.push(yReturn)
      }
    }
    const Ret = [Returnarr,Returntrack]
    return Ret[num]
  }

  return (
    <>
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <IncomeContext.Provider
        value={{
          tips,
          child,
          datepicker,
          carlink,
          worldlink,
          realtylink,
          homelink,
          scrollerlink,
          lock,
          Apply,
          setApply,
          Finalarr,
          FinalTrack,
          setFinalarr,
          OthExp,
          setOthExp,
          Increment,
          setIncrement,
          inflationRate,
          setInflationRate,
          TaxButton, 
          setTaxButton,
          Fees,
          setFees,
          ChildNum,
          setChildNum,
          inputLoanValue, 
          setInputLoanValue,
          date,
          setDate,
          Returnarr,
          Returns,
          accumulatedReturn,
          setaccumulatedReturn,
          car,
          setcar,
          world,
          setworld,
          house,
          sethouse,
          realty,
          setrealty,
          calculateExpense,
          calculateReserve,
          Income,
          setIncome,
          Invest,
          setInvest,
          Reserve,
          setReserve,
          Expense,
          setExpense,
        }}
      >
        {children}
      </IncomeContext.Provider>
    </>
  );
};

export default IncomeContextProvider;
