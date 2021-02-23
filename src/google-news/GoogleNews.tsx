import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { NewsStory } from '.';
import { Loading } from './Loading';
import styled from 'styled-components';

const Center = styled.div`
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export function GoogleNews() {
    return (
        <>
            <Center>
                <Loading />
            </Center>
            {/* {items.map((item) => (
                <NewsStory key={item.guid} {...item} />
            ))} */}
        </>
    );
}
