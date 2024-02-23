import React from "react";

const LoadingOverlay = () => {
    return (
        <div style={styles.overlay}>
            <div style={styles.spinner}></div>
            <div style={styles.text}>Loading...</div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    spinner: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "5px solid #ccc",
        borderTopColor: "#007bff",
        animation: "spin 1s linear infinite",
    },
    text: {
        marginTop: "10px",
        fontSize: "16px",
        color: "#333",
    },
    // Define spin animation keyframes
    "@keyframes spin": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
    },
};

export default LoadingOverlay;
