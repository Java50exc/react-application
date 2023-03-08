import React, {useState, useEffect} from "react";
import timeZones from "../time-zones";
type Props = {
    cityCountry:string;
}
export const Timer:React.FC<Props> = ({cityCountry}) => {
const styles: React.CSSProperties = {backgroundColor:"lightblue",
fontSize: "2em"};

const [time, setTime] = useState<Date>(new Date());

function tic() {
    setTime(new Date());
    
}

useEffect(() => {
    const interval = setInterval(tic, 2000);
    console.log("useEffect");
    return () => clearInterval(interval);
}, [])

    return <div>
        <h2 >Current Time in {cityCountry}</h2>
        <p style={styles}>{time.toLocaleTimeString(undefined, {timeZone:timeZones[3].name})}</p>
    </div>
}