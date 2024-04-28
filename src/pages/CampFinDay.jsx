import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { useLocation, useNavigate } from "react-router";
import { Card, Typography, Modal, Input } from "antd";
import { List } from "antd";
import { useEffect } from "react";
import { collection, query, where, onSnapshot,setDoc,doc } from "firebase/firestore";
import { database } from "../../firebase";



const CampFinDay = () => {
  const navigate = useNavigate();
// fetching operation going to transmit to campfindash
const [cred_data,setCreddata] = useState();
const [debit_data,setDebitdata]=useState();
const [data, setData] = useState([]);
const [newdata, setnewdata] = useState([]);
const [day, setday] = useState("");
const location = useLocation();
const camp = location.state;
// console.log('camp',camp);
let sum=0;
try
{
  sum=parseInt(camp.camp_bal.cash)+parseInt(camp.camp_bal.bank)+parseInt(camp.camp_bal.ta_off)+parseInt(camp.camp_bal.ta_da_civil)+parseInt(camp.camp_bal.messing_off)+parseInt(camp.camp_bal.messing_cad)+parseInt(camp.camp_bal.incidentials)+parseInt(camp.camp_bal.rank_pay)+parseInt(camp.camp_bal.pol)+parseInt(camp.camp_bal.ship_modelling);
  

}
catch(e)
{
  console.log("error",e);
}

// console.log('campsum',sum);
const fetch_cred =async()=>{
    try {
        
    
        const q = query(collection(database, "camp_credit"), where("camp_id", "==", camp.camp_name));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const creditsData = [];
          querySnapshot.forEach((doc) => {
            const cadet = {
              id: doc.id,
              ...doc.data(),
            };
    
            creditsData.push(cadet);
          });
          // console.log("realtime",cred_data);
          // console.log("cadet",cadetsData.campid);
          
          setCreddata(creditsData);
        });
    
        // Cleanup function
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching cadets:", error);
        
      }
}

const fetch_debit =async()=>{
    try {
        
    
        const q = query(collection(database, "camp_debit"), where("camp_id", "==", camp.camp_name));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const debitsData = [];
          querySnapshot.forEach((doc) => {
            const cadet = {
              id: doc.id,
              ...doc.data(),
            };
    
            debitsData.push(cadet);
          });
          // console.log("realtime",debit_data);
          // console.log("cadet",cadetsData.campid);
          
          setDebitdata(debitsData);
        });
    
        // Cleanup function
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching cadets:", error);
        
      }
}

useEffect(()=>{
    fetch_cred();
    fetch_debit();
},[]);
// console.log("realtime cred",cred_data);
// console.log("realtime deb",debit_data);


const writeprevdata = async (index) => {
  // console.log("---",index);
  const newdata={
    camp_day: index,
    date: camp.camp_date,
    opening_bal:0,
    closing_bal:0,
    camp_name:camp.camp_name,
  }
  try {
    const campref = collection(database, "camp_in_out");
    const documentRef = doc(campref,camp.camp_name+"_"+index);
    await setDoc(documentRef, newdata);
    console.log("Document written with ID: ", documentRef.id);
  } catch (e) {
    console.error("Error writing document: ", e);

  }
};

// ##########################################
  //   console.log(data.camp_name);
  // function for data
  useEffect(() => {
    const fetchAndProcessData = async () => {
        try {
            await fetch_cred();
            await fetch_debit();
            
            const dataList = [];

            // Merge credit and debit data into a single array
            const mergedData = [...cred_data, ...debit_data];

            // Filter out duplicate day counts
            const uniqueDayCounts = [...new Set(mergedData.map(item => item.day_count))];

            // Process data for unique day counts
            uniqueDayCounts.forEach(dayCount => {
                const credItem = cred_data.find(item => item.day_count === dayCount);
                const debitItem = debit_data.find(item => item.day_count === dayCount);

                if (credItem && debitItem) {
                    // Calculate total income and total expense
                    const totalIncome = parseFloat(credItem.cash || credItem.bank) + parseInt(credItem.ta_off) + parseInt(credItem.ta_da_civil) + parseInt(credItem.messing_off) + parseInt(credItem.messing_cad) + parseInt(credItem.incidentials) + parseInt(credItem.rank_pay) + parseInt(credItem.pol) + parseInt(credItem.ship_modelling);
                    const totalExpense = parseFloat(debitItem.cash || debitItem.bank) + parseInt(debitItem.ta_off) + parseInt(debitItem.ta_da_civil) + parseInt(debitItem.messing_off) + parseInt(debitItem.messing_cad) + parseInt(debitItem.incidentials) + parseInt(debitItem.rank_pay) + parseInt(debitItem.pol) + parseInt(debitItem.ship_modelling);
                    const balance = totalIncome - totalExpense;

                    dataList.push({
                        camp_day: dayCount,
                        date: credItem.date,
                        total_expense: totalExpense,
                        total_income: totalIncome,
                        balance: balance
                    });
                } else if (credItem) {
                    // If only credit data is available
                    const totalIncome = parseFloat(credItem.cash || credItem.bank) + parseInt(credItem.ta_off) + parseInt(credItem.ta_da_civil) + parseInt(credItem.messing_off) + parseInt(credItem.messing_cad) + parseInt(credItem.incidentials) + parseInt(credItem.rank_pay) + parseInt(credItem.pol) + parseInt(credItem.ship_modelling);
                    dataList.push({
                        camp_day: dayCount,
                        date: credItem.date,
                        total_expense: 0,
                        total_income: totalIncome,
                        balance: totalIncome
                    });
                } else if (debitItem) {
                    // If only debit data is available
                    const totalExpense = parseFloat(debitItem.cash || debitItem.bank) + parseInt(debitItem.ta_off) + parseInt(debitItem.ta_da_civil) + parseInt(debitItem.messing_off) + parseInt(debitItem.messing_cad) + parseInt(debitItem.incidentials) + parseInt(debitItem.rank_pay) + parseInt(debitItem.pol) + parseInt(debitItem.ship_modelling);
                    dataList.push({
                        camp_day: dayCount,
                        date: debitItem.date,
                        total_expense: totalExpense,
                        total_income: 0,
                        balance: -totalExpense
                    });
                }
            });

            // Update state with processed data
            
            dataList.push(newdata);
            setData(dataList);
        } catch (error) {
            console.error("Error fetching and processing data:", error);
        }
    };

    fetchAndProcessData();
}, [cred_data, debit_data]);


  // ###################
//  const data = [
//     {
//       camp_name: "Day 1",
//       date: "2021-10-01",
//       total_expense: 1000,
//       total_income: 2000,
//       balance: 1000,
//     },
//     {
//       camp_name: "Day 2",
//       date: "2021-10-02",
//       total_expense: 2000,
//       total_income: 3000,
//       balance: 1000,
//     },
//     {
//       camp_name: "Day 3",
//       date: "2021-10-03",
//       total_expense: 3000,
//       total_income: 4000,
//       balance: 1000,
//     },
//   ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [values, setValues] = useState({
    value1: "",
    value2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsModalOpen(false);
    // Do something with the values, for example, log them
    console.log("Submitted values:", values);
    const dataList={
      camp_day: `Day_${values.value1}`,
      date: values.value2,
      
  };
  // console.log("data",data);
  setnewdata(dataList);


  
  await writeprevdata(dataList.camp_day);
  
  };
  const handleClick = (index) => {
    console.log(`Card clicked with name: ${index.camp_day}`);
    // console.log(`Camp: ${camp.camp_name}`);
    // const campNameWithUnderscore = index.camp_day.replace(/\s/g, '_');
    
    // Filter cred_data and debit_data based on day_count
    // console.log('cred_data', cred_data);
    // console.log('debit_data', debit_data);
    // const dayCount = (index.camp_day.split(' ')[1]); // Extract the integer value from the string
    // console.log('day_count', dayCount);
    const filteredCredData = cred_data.filter(item => item.day_count === index.camp_day);

    const filteredDebitData = debit_data.filter(item => item.day_count === index.camp_day); 
    console.log("filteredCredData", filteredCredData);
    console.log("filteredDebitData", filteredDebitData);
    navigate(`/campfin/${camp.camp_name}/${index.camp_day}`, {
      state: { camp_name: index, credit_data: filteredCredData, debit_data: filteredDebitData },
    });
};


// console.log(data);
  return (
    <div className="flex w-full h-full">
      <SideBar />
      <div className="flex flex-col bg-white m-4 rounded-lg w-full min-h-full justify-start ">
        <div className="border-0 px-3 border-b  h-fit w-full">
          <h1 className="text-3xl m-3 font-semibold">{camp.camp_name}</h1>
        </div>
        <div className="flex flex-col gap-3  p-3">
          <div className="flex  justify-between p-3 border rounded-lg">
            <div className="">
              <Typography.Title level={5}>Camp Details</Typography.Title>
              <Typography.Text>Start Date: {camp.camp_date}</Typography.Text>
              <br />
              <Typography.Text>End Date: {camp.end_date}</Typography.Text>
              <br />
              <Typography.Text>Location: {camp.camp_area}</Typography.Text>
              <br />
              <Typography.Text>Commander: {camp.camp_commander}</Typography.Text>
              <br />
              <Typography.Text style={{fontSize:"20px", fontWeight:"bold" ,color:"green"}}>
                Grand Balance: {sum}
              </Typography.Text>
            </div>
            <div className="">
              <button
                onClick={showModal}
                className="bg-blue-600 text-white py-2 px-3 rounded-lg"
              >
                {" "}
                Add Day{" "}
              </button>
            </div>
          </div>

          <List
            header={<div className="font-semibold">Daily Expense</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item onClick={() => handleClick(item)}>
                <Typography.Text>{item.camp_day}</Typography.Text>
                <Typography.Text> {item.date}</Typography.Text>
                <Typography.Text>
                  Total Expense: {item.total_expense}
                </Typography.Text>
                <br />
                <Typography.Text>
                  Total Income: {item.total_income}
                </Typography.Text>
                <br />
                <Typography.Text>Balance: {item.balance}</Typography.Text>
              </List.Item>
            )}
          />
        </div>
        <Modal
          title="Add Day"
          open={isModalOpen}
          onCancel={handleCancel}
          okType="submit"
          okButtonProps={{ block: false }}
          footer={null}
        >
          <form onSubmit={handleSubmit}>
            <label className="flex gap-2">
              <div className="flex  whitespace-nowrap items-center justify-center">
                Day :
              </div>
              <Input
                type="text"
                name="value1"
                placeholder="Day No"
                value={values.value1}
                onChange={handleChange}
              />
            </label>
            <br />
            <label className="flex gap-2">
              <div className="flex  whitespace-nowrap items-center justify-center">
                Date :
              </div>
              <Input
                type="text"
                name="value2"
                placeholder="Date eg: 01-10-2024"
                value={values.value2}
                onChange={handleChange}
              />
            </label>
            <br />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-3 rounded-lg"
            >
              Submit
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default CampFinDay;
