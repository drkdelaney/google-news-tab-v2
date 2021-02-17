import React, { useEffect } from 'react';
import { useAppDispatch } from './context/AppContext';
import { GoogleImage } from './google-doodle/GoogleImage';
import { ActionType } from './models';
import { SearchBar } from './search-bar/SearchBar';
import { loadDoodles } from './services/DoodleService';
import { loadCurrentWeather } from './services/WeatherService';
import Weather from './weather/Weather';

function Main() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const init = async () => {
            try {
                const weather = await loadCurrentWeather();
                if (weather) {
                    dispatch({ type: ActionType.SET_CURRENT_WEATHER, weather });
                }
            } catch (error) {
                dispatch({ type: ActionType.SET_CURRENT_WEATHER_ERROR, error });
            }
            try {
                const doodles = await loadDoodles();
                if (doodles) {
                    dispatch({ type: ActionType.SET_DOODLES, doodles });
                }
            } catch (error) {
                dispatch({ type: ActionType.SET_DOODLES_ERROR, error });
            }
        };
        init();
    }, []);
    return (
        <>
            <Weather></Weather>
            <GoogleImage></GoogleImage>
            <SearchBar></SearchBar>
        </>
    );
}

export default Main;
