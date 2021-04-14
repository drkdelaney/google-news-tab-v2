import { useEffect } from 'react';
import { useAppDispatch, useAppState } from './context/AppContext';
import { GoogleImage } from './google-doodle';
import { GoogleNews, NewsTabs } from './google-news';
import { ModalDialog } from './dialogs';
import { ActionType, Topic } from './models';
import { SearchBar } from './search-bar';
import {
    hasCryptoISO,
    loadDoodles,
    loadRSSFeed,
    loadCurrentWeather,
    loadCryptoData,
} from './services';
import { loadTopics } from './services/StorageService';
import { defaultTopics } from './util/DefaultTopics';
import Weather from './weather/Weather';

function Main() {
    const dispatch = useAppDispatch();
    const { currentTopic, cryptoFrequency } = useAppState();
    useEffect(() => {
        const init = async () => {
            let topics;
            try {
                topics = await loadTopics();
                if (topics.length === 0) {
                    topics = defaultTopics;
                }
            } catch (e) {
                topics = defaultTopics;
            }
            dispatch({ type: ActionType.SET_TOPICS, topics });
            dispatch({ type: ActionType.SET_CURRENT_TOPIC, topic: topics[0] });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const loadRSS = async (topic: Topic) => {
            dispatch({ type: ActionType.RESET_CRYPTO_DATA }); // Reset crypto data when topic changes
            try {
                const news = await loadRSSFeed(topic);
                if (news) {
                    dispatch({
                        type: ActionType.SET_RSS_DATA,
                        data: news,
                        key: topic.id,
                    });
                }
            } catch (error) {
                dispatch({ type: ActionType.SET_RSS_ERROR, error });
            }
        };
        if (currentTopic) {
            loadRSS(currentTopic);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTopic]);
    useEffect(() => {
        const loadCrypto = async (topic: Topic, frequency: string) => {
            if (hasCryptoISO(topic.value)) {
                try {
                    const cryptoData = await loadCryptoData(
                        topic.value,
                        frequency
                    );
                    if (cryptoData) {
                        dispatch({
                            type: ActionType.SET_CRYPTO_DATA,
                            cryptoData,
                        });
                    }
                } catch (error) {
                    dispatch({
                        type: ActionType.SET_CRYPTO_DATA_ERROR,
                        error,
                    });
                }
            }
        };
        if (currentTopic && cryptoFrequency) {
            loadCrypto(currentTopic, cryptoFrequency);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cryptoFrequency, currentTopic]);
    return (
        <>
            <Weather></Weather>
            <GoogleImage></GoogleImage>
            <SearchBar></SearchBar>
            <NewsTabs></NewsTabs>
            <GoogleNews></GoogleNews>
            <ModalDialog></ModalDialog>
        </>
    );
}

export default Main;
