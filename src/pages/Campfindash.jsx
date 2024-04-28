import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SideBar from '../components/SideBar';
import Finance_cred from '../components/Finance/Camp_Finance/Fin_camp_cred_tab';
import Finance_deb from '../components/Finance/Camp_Finance/Fin_camp_deb_tab';
import Finance_add_cred from '../components/Finance/Camp_Finance/Fin_camp_add_cred';
import Finance_add_deb from '../components/Finance/Camp_Finance/Fin_camp_add_deb';
import { database } from "../../firebase";
import { onSnapshot, collection, query, where,getDocs,updateDoc } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import { data } from 'autoprefixer';

function Campfindash() {
    const { index } = useParams();
    const [credit_data, setCreddata] = useState([]);
    const [debit_data, setDebitdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [totalCredited, setTotalCredited] = useState({});
    const [totalDebited, setTotalDebited] = useState({});
    const [grandtotal, setGrandtotal] = useState({});
    const [trackgrandtotal, setTrackGrandtotal] = useState({});
    const [closingbalance, setClosingbalance] = useState({});
    const [openingbalance , setOpeningbalance] = useState({});
    const { camp_name } = location.state || {}; 
    
    const balsheet = location.state.balancesheet || {};
    
    
    
    const fetchopebal = async () => {
        try {
            const q = query(
                collection(database, "camp_main"),
                where("camp_name", "==", index)
            );
            const querySnapshot = await getDocs(q);
            const val=[];
            querySnapshot.forEach((doc) => {
                val.push(doc.data()); 
            });
            
            let totalopb = { Cash: 0, Bank: 0, 'TA/DA Officers/Cadets': 0, 'Messing Officers': 0, 'Messing Cadets': 0, Incidentals: 0, 'Rank pay/Honorarium': 0, 'TA/DA Civilians': 0, POL: 0, 'Ship Modelling': 0 };
            
                totalopb.Cash += parseFloat(val[0].camp_bal.cash || 0);
                totalopb.Bank += parseFloat(val[0].camp_bal.bank || 0);
                totalopb['TA/DA Officers/Cadets'] += parseInt(val[0].camp_bal.ta_off);
                totalopb['Messing Officers'] += parseInt(val[0].camp_bal.messing_off);
                totalopb['Messing Cadets'] += parseInt(val[0].camp_bal.messing_cad);
                totalopb.Incidentals += parseInt(val[0].camp_bal.incidentials);
                totalopb['Rank pay/Honorarium'] += parseInt(val[0].camp_bal.rank_pay);
                totalopb['TA/DA Civilians'] += parseInt(val[0].camp_bal.ta_da_civil);
                totalopb.POL += parseInt(val[0].camp_bal.pol);
                totalopb['Ship Modelling'] += parseInt(val[0].camp_bal.ship_modelling);
                
            setOpeningbalance(totalopb);
            
        } catch (error) {
            console.error("Error fetching credits:", error);
        }
        
    }

    useEffect(() => {
        //  fetchopebal();
    }, []);

    
    const handletheclose = async () => {
        
        
    
        try {
            const q = query(
                collection(database, "camp_in_out"),
                where("camp_name", "==", index),
                where("camp_day", "==", camp_name.camp_day)
            );
    
            const querySnapshot = await getDocs(q);
            const docRef = querySnapshot.docs[0].ref;
            
            
            await updateDoc(docRef, { closing_bal: grandtotal });
            console.log("Closing balance updated successfully!");
        } catch (error) {
            console.error("Error updating closing balance:", error);
        }
    };
    
    
    useEffect(() => {
        const fetchinout = async () => {
            
            try {
                const q = query(
                    collection(database, "camp_in_out"),
                    where("camp_name", "==", index),
                    where("camp_day", "==", camp_name.camp_day),
                );
    
                const querySnapshot = await getDocs(q);
                const docRef = querySnapshot.docs[0].ref;
                
                
                if(querySnapshot.docs[0].data().opening_bal==0){
                    await updateDoc(docRef, { opening_bal: openingbalance });
                    
                    console.log("Opening balance updated successfully!");
                    
                }
             
            } catch (error) {
                console.error("Error fetching credits:", error);
                
            }
        };
    
        fetchinout();
    
    }, []); 
    
    const fetch_cred = async () => {
        try {
            setLoading(true);
            const q = query(
                collection(database, "camp_credit"),
                where("camp_id", "==", index),
                where("day_count", "==", camp_name.camp_day)
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const creditsData = [];
                querySnapshot.forEach((doc) => {
                    const cadet = {
                        id: doc.id,
                        ...doc.data(),
                    };
                    creditsData.push(cadet);
                });
                setLoading(false);
                setCreddata(creditsData);
            });
            return () => {
                unsubscribe();
            };
        } catch (error) {
            console.error("Error fetching credits:", error);
            setLoading(false);
        }
    }

    const fetch_debit = async () => {
        try {
            setLoading(true);
            const q = query(
                collection(database, "camp_debit"),
                where("camp_id", "==", index),
                where("day_count", "==", camp_name.camp_day)
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const debitsData = [];
                querySnapshot.forEach((doc) => {
                    const cadet = {
                        id: doc.id,
                        ...doc.data(),
                    };
                    debitsData.push(cadet);
                });
                setLoading(false);
                setDebitdata(debitsData);
            });
            return () => {
                unsubscribe();
            };
        } catch (error) {
            console.error("Error fetching debits:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch_cred();
            await fetch_debit();
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        let totalcredited = { Cash: 0, Bank: 0, 'TA/DA Officers/Cadets': 0, 'Messing Officers': 0, 'Messing Cadets': 0, Incidentals: 0, 'Rank pay/Honorarium': 0, 'TA/DA Civilians': 0, POL: 0, 'Ship Modelling': 0 };
        let totaldebited = { Cash: 0, Bank: 0, 'TA/DA Officers/Cadets': 0, 'Messing Officers': 0, 'Messing Cadets': 0, Incidentals: 0, 'Rank pay/Honorarium': 0, 'TA/DA Civilians': 0, POL: 0, 'Ship Modelling': 0 };

        credit_data.forEach(item => {
            totalcredited.Cash += parseFloat(item.cash || 0);
            totalcredited.Bank += parseFloat(item.bank || 0);
            totalcredited['TA/DA Officers/Cadets'] += parseInt(item.ta_off) + parseInt(item.ta_da_civil);
            totalcredited['Messing Officers'] += parseInt(item.messing_off);
            totalcredited['Messing Cadets'] += parseInt(item.messing_cad);
            totalcredited.Incidentals += parseInt(item.incidentials);
            totalcredited['Rank pay/Honorarium'] += parseInt(item.rank_pay);
            totalcredited['TA/DA Civilians'] += parseInt(item.ta_da_civil);
            totalcredited.POL += parseInt(item.pol);
            totalcredited['Ship Modelling'] += parseInt(item.ship_modelling);
        });
        setTotalCredited(totalcredited);

        debit_data.forEach(item => {
            totaldebited.Cash += parseFloat(item.cash || 0);
            totaldebited.Bank += parseFloat(item.bank || 0);
            totaldebited['TA/DA Officers/Cadets'] += parseInt(item.ta_off) + parseInt(item.ta_da_civil);
            totaldebited['Messing Officers'] += parseInt(item.messing_off);
            totaldebited['Messing Cadets'] += parseInt(item.messing_cad);
            totaldebited.Incidentals += parseInt(item.incidentials);
            totaldebited['Rank pay/Honorarium'] += parseInt(item.rank_pay);
            totaldebited['TA/DA Civilians'] += parseInt(item.ta_da_civil);
            totaldebited.POL += parseInt(item.pol);
            totaldebited['Ship Modelling'] += parseInt(item.ship_modelling);
        });
        setTotalDebited(totaldebited);
        // calculate grand total for credit and debit as same array 
        // for each value of total credit subtract total debit
        let grandt = { Cash: 0, Bank: 0, 'TA/DA Officers/Cadets': 0, 'Messing Officers': 0, 'Messing Cadets': 0, Incidentals: 0, 'Rank pay/Honorarium': 0, 'TA/DA Civilians': 0, POL: 0, 'Ship Modelling': 0 };
        for (let key in totalcredited) {
            grandt[key] = totalcredited[key] - totaldebited[key];
        }
        setGrandtotal(grandt);
        
    }, [credit_data, debit_data]);
    
    

    const [activeComponent, setActiveComponent] = useState('Finance_cred');

    const toggleComponent = (componentName) => {
        setActiveComponent(componentName);
    };

    const renderFinanceComponent = () => {
        switch (activeComponent) {
            case 'Finance_cred':
                return <Finance_cred camp_id={index} camp_day={camp_name.camp_day} data={credit_data} total_cred={totalCredited} grandtotal={grandtotal} balancesheet={balsheet}/>;
            case 'Finance_deb':
                return <Finance_deb camp_id={index} camp_day={camp_name.camp_day}  data={debit_data} total_deb={totalDebited}  grandtotal={grandtotal} balancesheet={balsheet}/>;
            case 'Finance_add_cred':
                return <Finance_add_cred camp_id={index} camp_day={camp_name.camp_day} />;
            case 'Finance_add_deb':
                return <Finance_add_deb camp_id={index} camp_day={camp_name.camp_day} />;
            default:
                return null;
        }
    };

    return (
        <div style={styles.Container}>
            <SideBar />
            <div style={styles.innerbox}>
                <div>
                    <button onClick={() => toggleComponent('Finance_cred')} style={styles.btn}>Credit</button>
                    <button onClick={() => toggleComponent('Finance_deb')} style={styles.btn}>Debit</button>
                    <button onClick={() => toggleComponent('Finance_add_cred')} style={styles.btn}>Add Credit</button>
                    <button onClick={() => toggleComponent('Finance_add_deb')} style={styles.btn}>Add Debit</button>
                
                    <button onClick={handletheclose} style={styles.closebtn}>Close the Transactions</button>
                
                </div>
                {renderFinanceComponent()}
            </div>
        </div>
    );
}

export default Campfindash;

const styles = {
    Container: {
        display: "flex",
        justifyContent: "left",
    },
    btn: {
        margin: "20px",
        padding: "10px",
        fontSize: "20px",
        backgroundColor: "grey",
        borderRadius: "10px",
        cursor: "pointer"
    },
    innerbox: {
        margin: "20px",
        padding: "20px",
        backgroundColor: "lightgrey",
        borderRadius: "10px",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    closebtn: {
        margin: "20px",
        padding: "10px",
        fontSize: "30px",
        color: "white",
        backgroundColor: "red",
        borderRadius: "10px",
        cursor: "pointer",
        
        position: "absolute",
        right: "0"

    }
};
