import React from 'react'

export const Data = () => {
    const [Expense, setExpense] = useState(30);
    const [Reserve, setReserve] = useState(10);

  
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

  // const incomeSlab = (Income) =>{

  //   let Investment,Reserves,Expenses

  //   if (Income < 5000) {
  //     Expenses = Math.max(3000, (Income * 0.75));
  //     Reserves = Math.max(400, (Income * 0.10));
  //   } else if (Income < 7000) {
  //     Expenses = Math.max(3500, (Income * 0.60));
  //     Reserves = Math.max(500, (Income * 0.10));
  //   } else if (Income < 10000) {
  //     Expenses = Math.max(4000, (Income * 0.45));
  //     Reserves = Math.max(800, (Income * 0.10));
  //   } else if (Income < 15000) {
  //     Expenses = Math.max(5000, (Income * 0.35));
  //     Reserves = Math.max(1000, (Income * 0.08));
  //   } else if (Income < 20000) {
  //     Expenses = Math.max(5000, (Income * 0.30));
  //     Reserves = Math.max(1300, (Income * 0.08));
  //   } else if (Income < 25000) {
  //     Expenses = Math.max(5500, (Income * 0.25));
  //     Reserves = Math.max(1800, (Income * 0.08));
  //   } else if (Income < 30000) {
  //     Expenses = Math.max(7000, (Income * 0.25));
  //     Reserves = Math.max(2000, (Income * 0.07));
  //   } else if (Income < 40000) {
  //     Expenses = Math.min(Math.max(8000, (Income * 0.23)), 8500);
  //     Reserves = Math.max(2500, (Income * 0.07));
  //   } else if (Income < 50000) {
  //     Expenses = Math.min(Math.max(9000, (Income * 0.21)), 9500);
  //     Reserves = Math.max(2700, (Income * 0.06));
  //   } else if (Income < 60000) {
  //     Expenses = Math.max(10000, (Income * 0.18));
  //     Reserves = 3000;
  //   } else if (Income < 100000) {
  //     Expenses = Math.min(Math.max(11000, (Income * 0.15)), 12000);
  //     Reserves = 3000;
  //   } else if (Income < 150000) {
  //     Expenses = Math.min(Math.max(14000, (Income * 0.12)), 15000);
  //     Reserves = 3000;
  //   } else if (Income < 200000) {
  //     Expenses = 16000;
  //     Reserves = 3000;
  //   } else if (Income < 400000) {
  //     Expenses = 16000;
  //     Reserves = 3000;
  //   } else {
  //     Expenses = 18000;
  //     Reserves = 3000;
  //   }
  //   Investment = Income - Expenses - Reserves;
  //   setExpense(Expenses);
  //   setReserve(Reserves);
  //   setInvest(Investment);
  //  }

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
    } else if (income < 10000) {
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

    let reserve =
      (startReservePercentage -
        (income - minIncome) * reservePercentageDecrement) *
      income;
    if (income > 50000) {
      reserve = 3000;
    } else if (Income < 5000) {
      reserve = Math.max(300, Income * 0.1);
    } else if (Income < 7000) {
      reserve = Math.max(500, Income * 0.1);
    } else if (Income < 10000) {
      reserve = Math.max(800, Income * 0.1);
    }
    return reserve;
  }

  
  const Incomearr = [];
  const Investarr = [];
  const Expensearr = [];
  const Reservearr = [];
  const mReturnsarrTemp = [];
  const yReturnsarrTemp = [];
  
  useEffect(() => {
    const expense = calculateExpense(Income);
    const reserve = calculateReserve(Income);
    const invest = Income - (reserve + expense);
    setExpense(expense);
    setReserve(reserve);
    setInvest(invest > 0 ? invest : 0);
    setReturnsarr(yReturnsarrTemp)
  }, [Income,Invest]);
  
  let months = ["January","February","March", "April","May","June","July","August",    "September",    "October","November","December", ];
  let monthIndex = new Date().getMonth();
  let currYear = new Date().getFullYear();
  let years = [];
  let monthlab = [];
  

  for (let i = 0; i < 13; i++) {
    const index = (monthIndex + i) % months.length;
    monthlab.push(months[index]);
    i === 11 ? null : years.push(currYear + i);

    let mIncome = Income * (i + 1);
    let yIncome = mIncome * 12;
    let mInvest = Invest * (i + 1);
    let yInvest = mInvest * 12;
    let mExpense = Expense * (i + 1);
    let yExpense = mExpense * 12;
    let mReserve = Reserve * (i + 1);
    let yReserve = mReserve * 12;
    let mReturn = mInvest + mInvest * 0.12;
    let yReturn = mReturn * 12;

    if (moyear === "Month") {
      Incomearr.push(mIncome);
      Investarr.push(mInvest);
      Expensearr.push(mExpense);
      Reservearr.push(mReserve);
      mReturnsarrTemp.push(mReturn);
    } else {
      Incomearr.push(yIncome);
      Investarr.push(yInvest);
      Expensearr.push(yExpense);
      Reservearr.push(yReserve);
      yReturnsarrTemp.push(yReturn);
    }
    // console.log(yReturn);
  }
  return (
    <div>Data</div>
  )
}
