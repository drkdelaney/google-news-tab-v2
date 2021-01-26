import React, { useEffect } from 'react';
import { useAppDispatch } from './context/AppContext';
import { ActionType } from './models';
import { getCurrentWeather } from './services/WeatherService';
import Weather from './weather/Weather';

function Main() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const init = async () => {
            const weather = await getCurrentWeather();
            if (weather) {
                dispatch({ type: ActionType.SET_CURRENT_WEATHER, weather });
            }
        };
        init();
    }, []);
    return (
        <>
            <Weather></Weather>
        </>
    );
}

export default Main;
