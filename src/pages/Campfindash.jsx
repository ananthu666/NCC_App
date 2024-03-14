import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router';
import SideBar from '../components/SideBar';
import Camptable from '../components/CampTable';
import { Container } from 'postcss';
import CadetForm from '../components/CadetForm';
import Finance_cred from '../components/Fin_camp_cred_tab';
import Finance_deb from '../components/Fin_camp_deb_tab';
import Finance_add_cred from '../components/Fin_camp_add_cred';
import Finance_add_deb from '../components/Fin_camp_add_deb';
import { database } from "../../firebase";
import { doc, getDoc ,onSnapshot,collection,query, where} from "firebase/firestore";


function Campfindash() {
    const { index } = useParams();
    const [cred_data,setCreddata] = useState();
    const [debit_data,setDebitdata]=useState();
    const [loading,setLoading] = useState(false);
    const fetch_cred =async()=>{
        try {
            setLoading(true);
        
            const q = query(collection(database, "camp_credit"), where("camp_id", "==", index));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const creditsData = [];
              querySnapshot.forEach((doc) => {
                const cadet = {
                  id: doc.id,
                  ...doc.data(),
                };
        
                creditsData.push(cadet);
              });
              // console.log("realtime",cadetsData);
              // console.log("cadet",cadetsData.campid);
              setLoading(false);
              setCreddata(creditsData);
            });
        
            // Cleanup function
            return () => {
              unsubscribe();
            };
          } catch (error) {
            console.error("Error fetching cadets:", error);
            setLoading(false);
          }
    }

    const fetch_debit =async()=>{
        try {
            setLoading(true);
        
            const q = query(collection(database, "camp_debit"), where("camp_id", "==", index));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              const debitsData = [];
              querySnapshot.forEach((doc) => {
                const cadet = {
                  id: doc.id,
                  ...doc.data(),
                };
        
                debitsData.push(cadet);
              });
              // console.log("realtime",cadetsData);
              // console.log("cadet",cadetsData.campid);
              setLoading(false);
              setDebitdata(debitsData);
            });
        
            // Cleanup function
            return () => {
              unsubscribe();
            };
          } catch (error) {
            console.error("Error fetching cadets:", error);
            setLoading(false);
          }
    }

    useEffect(()=>{
        fetch_cred();
        fetch_debit();
    },[]);

    const [activeComponent, setActiveComponent] = useState('Finance_cred'); // State to determine which finance component to show

    // Function to toggle between finance components
    const toggleComponent = (componentName) => {
        setActiveComponent(componentName); // Set active component based on button clicked
    };

    // Function to render the active finance component
    const renderFinanceComponent = () => {
        
        switch (activeComponent) {
            case 'Finance_cred':
                return <Finance_cred camp_id={index} data={cred_data} />;
            case 'Finance_deb':
                return <Finance_deb camp_id={index} data={debit_data}/>;
            case 'Finance_add_cred':
                return <Finance_add_cred camp_id={index}/>;
            case 'Finance_add_deb':
                return <Finance_add_deb camp_id={index}/>;
            default:
                return null;
        }
    };

    return (
        <div style={styles.Container}>
            <SideBar />
            <div style={styles.innerbox}>
                <div>
                    {/* Buttons to toggle between finance components */}
                    <button onClick={() => toggleComponent('Finance_cred')} style={styles.btn}>Credit</button>
                    <button onClick={() => toggleComponent('Finance_deb')} style={styles.btn}>Debit</button>
                    <button onClick={() => toggleComponent('Finance_add_cred')} style={styles.btn}>Add Credit</button>
                    <button onClick={() => toggleComponent('Finance_add_deb')} style={styles.btn}>Add Debit</button>
                </div>
                {/* Render the active finance component */}
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
        backgroundColor: "lightblue",
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
