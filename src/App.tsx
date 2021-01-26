import React from 'react';
import { AppProvider } from './context/AppContext';
import Main from './Main';

function App() {
    return (
        <div className="App">
            <AppProvider>
                <Main></Main>
            </AppProvider>
        </div>
    );
}

export default App;
