import React from 'react';

const BalanceSheet = ({totalCredit,totalDebit}) => {
    
    const totalBalance = totalCredit - totalDebit;

    return (
        <div style={styles.container}>
            {/* Total Credit Card */}
            <div style={styles.card}>
                <h3>Total Credit:</h3>
                <p>{totalCredit}</p>
            </div>
            {/* Total Debit Card */}
            <div style={styles.card}>
                <h3>Total Debit:</h3>
                <p>{totalDebit}</p>
            </div>
            {/* Total Balance Card */}
            <div style={styles.card}>
                <h3>Total Balance:</h3>
                <p>{totalBalance}</p>
            </div>
        </div>
    );
};

export default BalanceSheet;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '20px',
    },
    card: {
        width: '250px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff',
        textAlign: 'center',
    },
};
