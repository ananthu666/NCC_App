import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SideBar from '../components/SideBar';
import Finance_cred from '../components/Finance/Camp_Finance/Fin_camp_cred_tab';
import Finance_deb from '../components/Finance/Camp_Finance/Fin_camp_deb_tab';
import Finance_add_cred from '../components/Finance/Camp_Finance/Fin_camp_add_cred';
import Finance_add_deb from '../components/Finance/Camp_Finance/Fin_camp_add_deb';
import { database } from "../../firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useLocation } from 'react-router-dom';

function Campfindash() {
    const { index } = useParams();
    const [credit_data, setCreddata] = useState([]);
    const [debit_data, setDebitdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [totalCredited, setTotalCredited] = useState({});
    const [totalDebited, setTotalDebited] = useState({});
    const [grandtotal, setGrandtotal] = useState({});
    const [closingbalance, setClosingbalance] = useState(0);
    const { camp_name } = location.state || {};

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
    console.log("====grandtotal", grandtotal)
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
    // console.log('totalDebited',totalDebited);
    // console.log('totalCredited',totalCredited);
    // console.log('grandtotal',grandtotal);

    const [activeComponent, setActiveComponent] = useState('Finance_cred');

    const toggleComponent = (componentName) => {
        setActiveComponent(componentName);
    };

    const renderFinanceComponent = () => {
        switch (activeComponent) {
            case 'Finance_cred':
                return <Finance_cred camp_id={index} data={credit_data} total_cred={totalCredited} grandtotal={grandtotal}/>;
            case 'Finance_deb':
                return <Finance_deb camp_id={index} data={debit_data} total_deb={totalDebited}  grandtotal={grandtotal}/>;
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
    }
};
