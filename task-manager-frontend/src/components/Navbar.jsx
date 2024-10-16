import React from 'react';

function Navbar() {
    return (
        <div style={styles.navbar}>
            <div style={styles.navbarLeft}>
                <i className="fa fa-calendar" style={styles.icon}></i> {/* Font Awesome calendar icon */}
            </div>
            <div style={styles.navbarRight}>
                <button style={styles.loginBtn}>Login</button>
                <button style={styles.signupBtn}>Signup</button>
            </div>
        </div>
    );
}

const styles = {
    navbar: {
        backgroundColor: '#4285F4', // Blue background color
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        alignItems: 'center',
    },
    navbarLeft: {
        marginLeft: '10px',
    },
    icon: {
        color: 'white',
        fontSize: '20px',
    },
    navbarRight: {
        display: 'flex',
        gap: '10px',
    },
    loginBtn: {
        backgroundColor: 'transparent',
        color: 'white',
        border: 'none',
        padding: '5px 15px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    signupBtn: {
        backgroundColor: 'white',
        color: '#4285F4',
        borderRadius: '5px',
        padding: '5px 15px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Navbar;
