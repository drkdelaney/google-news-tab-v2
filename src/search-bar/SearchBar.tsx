import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import { useAppDispatch } from '../context/AppContext';
import { ActionType, ModalType, Topic } from '../models';
import { AddTab } from '../google-news';

const SearchBoxWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MenuWrapper = styled.div`
    position: absolute;
    left: -40px;
    top: 10px;
    cursor: pointer;
`;

const AddTabContainer = styled.div`
    left: 595px;
    position: absolute;
    top: 0;
`;

const GoogleSearchBox = styled.div`
    width: 580px;
    position: relative;
    background-color: #fff;
    height: 46px;
    border-radius: 22px;
    border: 1px solid #dfe1e5;
    box-shadow: none;

    &:hover {
        box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
        border-color: rgba(223, 225, 229, 0);
    }
`;

const Input = styled.input`
    position: absolute;
    bottom: 5px;
    width: 100%;
    padding: 0 20px;
    height: 34px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }
`;

export function SearchBar() {
    const [searchText, onSearchTextChange] = useState('');
    const dispatch = useAppDispatch();
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onSearchTextChange(e.target.value);
    }
    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            if (validURL(searchText)) {
                if (/^(http|https)/.test(searchText))
                    window.open(searchText, '_top');
                else window.open(`https://${searchText}`, '_top');
            } else {
                window.open(
                    `https://www.google.com/search?q=${encodeURIComponent(
                        searchText
                    )}`,
                    '_top'
                );
            }
        }
    }

    function handleMenuClick() {
        dispatch({
            type: ActionType.OPEN_MODAL,
            data: { modalType: ModalType.EDIT },
        });
    }

    function updateSelection(topic: Topic) {
        dispatch({
            type: ActionType.SET_CURRENT_TOPIC,
            topic,
        });
    }

    return (
        <SearchBoxWrapper>
            <GoogleSearchBox>
                <MenuWrapper onClick={handleMenuClick} title="Edit">
                    <MenuIcon />
                </MenuWrapper>
                <Input
                    type="text"
                    placeholder="Search Google or type a Url"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={searchText}
                />
                <AddTabContainer title="Add Topic">
                    <AddTab
                        key="addTabKey"
                        onTabAdded={(topic: Topic) => {
                            updateSelection(topic);
                        }}
                    />
                </AddTabContainer>
            </GoogleSearchBox>
        </SearchBoxWrapper>
    );
}

function validURL(str: string) {
    var pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // fragment locator
    return !!pattern.test(str);
}
