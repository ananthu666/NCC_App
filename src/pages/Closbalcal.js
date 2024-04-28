const Processdata = (inout, bal) => {
   const keyMap = {
      'bank': 'Bank',
      'cash': 'Cash',
      'ta_da_civil': 'TA/DA Civilians',
      'messing_off': 'Messing Officers',
      'messing_cad': 'Messing Cadets',
      'incidentials': 'Incidentals',
      'rank_pay': 'Rank pay/Honorarium',
      'ta_off': 'TA/DA Officers/Cadets',
      'pol': 'POL',
      'ship_modelling': 'Ship Modelling',

  };

  // Create the openingBalance object with reversed keys
  const openingBalance = [];
  Object.keys(bal).forEach(key => {
      const reversedKey = keyMap[key];
      if (reversedKey) {
          openingBalance[reversedKey] = bal[key];
      }
  });


//    let openingBalance = [];
//    let keyhead = Object.keys(bal);

//    keyhead.forEach(key =>{
//       openingBalance[key] =bal[key];
// })


const balancesList = [];
const inoutCopy = [...inout];
// console.log("openingBalance ", openingBalance)  ;
// console.log("bal",bal) ;
// console.log("inout ", inout) ;
   // let i=0;
   inoutCopy.forEach(day => {
      const opbal = {};
      Object.keys(openingBalance).forEach(key => {
         opbal[key]=openingBalance[key];
      });

      const closingBalance = { ...day.closing_bal };
      // console.log('closingBalance',i++,closingBalance);

       // Subtract the closing balance of the current day from the opening balance
       Object.keys(openingBalance).forEach(key => {
           openingBalance[key] -= closingBalance[key];
       });
       
       // Save the opening and closing balances for the current day
      //  console.log("opbal",opbal);
       const balances = {
           
           opening_balance: { ...opbal },
           closing_balance: { ...openingBalance }
       };

       
       balancesList[day.camp_day] = balances;
   });
   console.log('balancesList',balancesList["Day_1"]);
   return balancesList;
};

export default Processdata;
