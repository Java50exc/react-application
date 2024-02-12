import React, { useState, useEffect } from "react";
import timeZones from "../time-zones";
import './Timer.css'
type Props = {
    cityCountry: string;
}
export const Timer: React.FC<Props> = ({ cityCountry }) => {
    const styles: React.CSSProperties = {
        backgroundColor: "lightblue",
        fontSize: "2em"
    };

    const [time, setTime] = useState<Date>(new Date());

    function tic() {
        setTime(new Date());

    }

    function getTimeZone(sc: string): string  {
        const defaultZone: string = timeZones.find(e => JSON.stringify(e).includes("Israel"))!.name;
        const actualZone = timeZones.find(e => JSON.stringify(e).includes(sc))?.name;
        return actualZone || defaultZone;
    }

    useEffect(() => {
        const interval = setInterval(tic, 2000);
        console.log("useEffect");
        return () => clearInterval(interval);
    }, [])


    return <div className="timer-component">
        <h2 >Current Time in {cityCountry}</h2>
        <p style={styles}>{time.toLocaleTimeString(undefined, { timeZone: getTimeZone(cityCountry) })}</p>
    </div>
}