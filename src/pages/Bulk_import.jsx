import React, { useState } from 'react';
import ImportTab from "../components/Cadet/BulkTable";
import * as XLSX from 'xlsx';
import { Button } from 'antd';
import SideBar from "../components/SideBar";
import {writeBatch,doc} from "firebase/firestore";
import { database } from "../../firebase";

const ImportPage = () => {
    const [excelData, setExcelData] = useState(null);
    const download_excel = () => {
        window.location.href = 'https://docs.google.com/spreadsheets/d/11RL4Al4xhwHj5APmspWacYGb_qLxEz1z/edit?usp=sharing&ouid=104150933983653985067&rtpof=true&sd=true';
    };
    
    const handleExcelUpload = (file) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            setExcelData(jsonData);
            console.log('Excel data:', jsonData);
            
        };

        reader.readAsArrayBuffer(file);
    };

    const importdata = async() => {
        const batch = writeBatch(database);
    try {
        excelData.forEach((data) => {
          console.log(data);
            const cadetDocRef = doc(database, "cadets",data.id);
            batch.set(cadetDocRef, data);
        });
        await batch.commit();
        console.log('Excel file uploaded successfully.');
    } catch (e) {
        console.log(e);
    }
    };
    return (
        <div style={styles.outercont}>
            <SideBar />
        <div style={styles.importPage}>
            <div>
                <Button style={styles.tbtn} onClick={download_excel}>Download Template</Button>
            </div>
            <div style={styles.importContainer}>
                <h1 style={styles.importTitle}>Import Excel Data</h1>
                <div style={styles.importContent}>
                <input
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => {
                    const file = e.target.files[0];
                    handleExcelUpload(file);
                }}
            />
                </div>
                <Button style={styles.btn} onClick={importdata}>Import</Button>
            </div>
            <ImportTab data={excelData}/>
        </div>
        </div>
    );
};

export default ImportPage;

const styles = {
    outercont: {
        display: 'flex',
        flexDirection: 'row',
    },
    importPage: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    importContainer: {
        display: 'flex', // Add this line
        flexDirection: 'column', // Adjust flex direction if needed
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '800px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        height: '50%',
    },
    importTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: 'red',
    },
    importContent: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        height: '20%',
    },
    btn: {
        backgroundColor: 'grey',
        color: 'white',
        borderRadius: '5px',
        marginTop: '20px',
        height: '40px',
        width: '30%',
        fontSize: '20px',
    },
    tbtn: {
        backgroundColor: 'grey',
        color: 'blue',
        borderRadius: '5px',
        marginBottom: '10px',
        height: '40px',
        
        
    },
};
