import React from 'react';
import styled from 'styled-components';
import { useAppState } from '../context/AppContext';
import { getIconInfo } from '../services/LocationService';
import weatherIcons from './WeatherIcons.json';

const WeatherWrapper = styled.div`
    color: #202124;
    display: flex;
    font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    max-width: 300px;
    position: fixed;
    right: 16px;
    top: 16px;
    transition: top 0.3s;

    &.offset {
        transition: top 0.3s;
        top: 64px;
    }
`;

const WeatherIcon = styled.img`
    height: 50px;
    position: relative;
    width: 50px;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 5px;
`;

export default function Weather() {
    const { weather } = useAppState();
    if (!weather?.properties?.periods) return null;

    const {
        properties: {
            periods: [currentForecast],
        },
    } = weather;
    const iconInfo = getIconInfo(currentForecast.icon);

    if (!iconInfo) return null;

    const [key, dayNight] = iconInfo;
    const iconObject = (weatherIcons as any)[key];

    return (
        <WeatherWrapper title={currentForecast.detailedForecast}>
            <WeatherIcon
                src={iconObject.icons[dayNight]}
                alt={iconObject.description}
            />
            <FlexColumn>
                <div>
                    {currentForecast.temperature}&deg;{' '}
                    {currentForecast.temperatureUnit}
                </div>
                <div>{currentForecast.shortForecast}</div>
            </FlexColumn>
        </WeatherWrapper>
    );
}
