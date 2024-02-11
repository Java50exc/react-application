import React from "react"
export const Timer: React.FC = () => {
    const [titleColor, setColor] = React.useState("lightblue");
    const [time, setTime] = React.useState(new Date())
    const styles: React.CSSProperties = { backgroundColor: "lightblue", fontSize: "2em" };

    setTimeout(color, 10000);
    setTimeout(tic, 1000);


    function tic() {
        setTime(new Date());
    }

    function color() {
        setColor(titleColor === "red" ? "lightblue" : "red");
    }

    return <div>
        <h2 style={{ color: titleColor }}>Current Time</h2>
        <p style={styles}>{time.toLocaleTimeString()}</p>
    </div>
}