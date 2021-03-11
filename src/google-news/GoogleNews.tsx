import { useState, useEffect } from 'react';
import { NewsStory } from '.';
import { Loading } from './Loading';
import { CryptoResult } from '../crypto/CryptoData';
import styled from 'styled-components';
import { useAppState } from '../context/AppContext';

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoadingContainer = styled.div`
    padding-top: 75px;
`;
const NewsStoryContainer = styled.div`
    width: 700px;
`;

export function GoogleNews() {
    const { currentTopic, rssData, cryptoData } = useAppState();
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const hasData =
            currentTopic && rssData.get(currentTopic.id)?.length > 0;
        setShowLoading(!hasData);
    }, [rssData, currentTopic]);

    return (
        <Center>
            {showLoading && (
                <LoadingContainer>
                    <Loading />
                </LoadingContainer>
            )}
            {!showLoading && (
                <NewsStoryContainer>
                    {cryptoData && <CryptoResult />}
                    {currentTopic &&
                        rssData
                            .get(currentTopic.id)
                            ?.map((item: any) => (
                                <NewsStory key={item.guid} {...item} />
                            ))}
                </NewsStoryContainer>
            )}
        </Center>
    );
}
