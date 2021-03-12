import { useState } from 'react';
import Chart from 'react-google-charts';
import styled from 'styled-components';
import { useAppDispatch, useAppState } from '../context/AppContext';
import { ActionType } from '../models';
import { frequencies } from '../util/Frequencies';

const ResultContainer = styled.div`
    border-radius: 12px;
    border: 1px solid #dadce0;
    margin: 12px;
    position: relative;
`;

const Title = styled.a`
    color: inherit;
    font-size: 28px;
    font-weight: bold;
    margin: 0 22px;
    text-decoration: none;
    text-transform: capitalize;
    &:hover {
        text-decoration: none;
    }

    & .iso {
        color: #888888;
        font-size: 20px;
        margin-left: 12px;
        text-transform: uppercase;
    }
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 24px 32px;
`;

const Price = styled.div`
    font-size: 24px;

    & .diff {
        color: #888888;
        font-size: 18px;
        margin-left: 12px;
    }
`;

const Period = styled.span<{ selected: boolean }>`
    color: ${(props) => (props.selected ? 'var(--blue)' : 'var(--light-grey)')};
    cursor: pointer;
    padding: 0 8px;
    font-size: 12px;
`;

const Disclaimer = styled.div`
    font-size: 10px;
    text-align: right;
    padding: 5px 10px;
`;

function formatCurrency(number: number): string {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number);
}

function calculatePercentDiff(a: number, b: number): number {
    const percent = ((a - b) / a) * 100;
    return Math.round(percent * 100) / 100;
}

export function CryptoResult() {
    const { cryptoData, cryptoFrequency } = useAppState();
    const dispatch = useAppDispatch();
    const last = cryptoData?.entries[cryptoData?.entries.length - 1][1] ?? 0;
    const first = cryptoData?.entries[0][1] ?? 0;
    const cost = formatCurrency(last);

    function formatChartData() {
        if (cryptoData) {
            return [
                ['Date', 'Price'],
                ...cryptoData.entries.map((entry) => {
                    return [new Date(entry[0]), entry[1]];
                }),
            ];
        }
        return [];
    }

    const chartOptions = {
        chartArea: {
            bottom: 20,
            left: 90,
            right: 20,
            top: 10,
        },
        vAxis: {
            format: 'currency',
            gridlines: {
                count: 4,
            },
        },
        hAxis: {
            format: 'hh a',
            gridlines: {
                color: 'transparent',
                count: 6,
            },
        },
        legend: {
            position: 'none',
        },
    };

    const diff = calculatePercentDiff(last, first);
    return (
        <>
            <Title
                href={`https://www.coindesk.com/price/${cryptoData?.slug}`}
                target="_blank"
            >
                {cryptoData?.name}
                <span className="iso">{cryptoData?.iso}</span>
            </Title>
            <ResultContainer>
                <Top>
                    <Price>
                        {cost}
                        <span className="diff">
                            {diff >= 0 && '+'}
                            {`${diff}%`}
                        </span>
                    </Price>
                    <div>
                        {frequencies.map((frequency, i) => (
                            <Period
                                key={i}
                                selected={cryptoFrequency === frequency}
                                onClick={() => {
                                    dispatch({
                                        type: ActionType.SET_CRYPTO_FREQUENCY,
                                        frequency,
                                    });
                                }}
                            >
                                {frequency}
                            </Period>
                        ))}
                    </div>
                </Top>
                <Chart
                    chartType="AreaChart"
                    data={formatChartData()}
                    options={chartOptions}
                    legendToggle={false}
                />
                <Disclaimer>
                    Powered by <a href="https://www.coindesk.com/">CoinDesk</a>
                </Disclaimer>
            </ResultContainer>
        </>
    );
}
