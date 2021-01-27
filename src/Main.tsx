import React, { useEffect } from 'react';
import { useAppDispatch } from './context/AppContext';
import { GoogleImage } from './google-doodle/GoogleImage';
import { ActionType } from './models';
import { loadCurrentWeather } from './services/WeatherService';
import Weather from './weather/Weather';

function Main() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const init = async () => {
            const weather = await loadCurrentWeather();
            if (weather) {
                dispatch({ type: ActionType.SET_CURRENT_WEATHER, weather });
            }
            const doodles = await loadDoodles();
        };
        init();
    }, []);
    return (
        <>
            <Weather></Weather>
            <GoogleImage></GoogleImage>
        </>
    );
}

export default Main;
