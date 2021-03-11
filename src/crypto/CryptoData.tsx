import { useState } from 'react';
import Chart from 'react-google-charts';
import styled from 'styled-components';
import { useAppState } from '../context/AppContext';

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
`;

const Period = styled.span<{ selected: boolean }>`
    color: ${(props) => (props.selected ? 'var(--blue)' : 'var(--light-grey)')};
    cursor: pointer;
    padding: 0 8px;
    font-size: 12px;
`;

const Disclamer = styled.div`
    font-size: 10px;
    text-align: right;
    padding: 5px 10px;
`;

const frequencies = ['1H', '12H', '1D', '1W', '1M', '3M', '1Y', 'ALL'];

function formatCurrency(number: number): string {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number);
}

export function CryptoResult() {
    const { cryptoData } = useAppState();
    const [periodIndex, setPeriodIndex] = useState(2);
    const latest = cryptoData?.entries[cryptoData?.entries.length - 1][1] ?? 0;
    const cost = formatCurrency(latest);

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
                    <Price>{cost}</Price>
                    <div>
                        {frequencies.map((frequency, i) => (
                            <Period
                                key={i}
                                selected={periodIndex === i}
                                onClick={() => setPeriodIndex(i)}
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
                ></Chart>
                <Disclamer>
                    Powered by <a href="https://www.coindesk.com/">CoinDesk</a>
                </Disclamer>
            </ResultContainer>
        </>
    );
}
