import React, { useState, useEffect, useRef } from "react";
import timeZones from "../time-zones";
import { Input } from "./Input";

type Props = {
    cityCountry: string;
}
export const Timer: React.FC<Props> = ({ cityCountry }) => {
    const styles: React.CSSProperties = { backgroundColor: "lightblue", fontSize: "2em" };
    const [time, setTime] = useState<Date>(new Date());
    const [timeZone, setZone] = useState<string>(getTimeZone(cityCountry)!);
    const [currentCityCountry, setCityTitle] = useState<string>(getTimeZone(cityCountry)!);


    function tic() {
        setTime(new Date());
    }

    useEffect(() => {
        const interval = setInterval(tic, 1000);
        return () => clearInterval(interval);
    }, [])

    function setTimeZone(city: string): string {
        const timeZone: string = getTimeZone(city)!;

        if (timeZone) {
            const zoneName: string[] = timeZone.split('/');
            const cityCountry: string = zoneName[zoneName.length - 1];
            setCityTitle(cityCountry.split('_').join(' '));
            setZone(timeZone);
            return "";
        }
        return "No such time zone";
    }

    function getTimeZone(city: string): string | undefined {
        const index = timeZones.findIndex(tz => JSON.stringify(tz).includes(city));
        return index < 0 ? undefined : timeZones[index].name;
    }

    return <div>
        <Input submitFn={setTimeZone} placeHolder={"Choose city or country"} />
        <h2 >Current Time in {currentCityCountry}</h2>
        <p style={styles}>{time.toLocaleTimeString(undefined, { timeZone: timeZone })}</p>
    </div>
}