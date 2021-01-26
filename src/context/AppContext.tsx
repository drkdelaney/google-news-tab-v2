import { createContext, ReactNode, useContext, useReducer } from 'react';
import { appReducer } from './AppReducer';
import { AppState, initialAppState } from './AppState';
import { Dispatch } from './AppTypes';

export interface AppProviderProps {
    children: ReactNode;
}

const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<Dispatch | undefined>(undefined);

export function AppProvider({ children }: AppProviderProps) {
    const [state, dispatch] = useReducer(appReducer, initialAppState);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
}

export function useAppDispatch() {
    const context = useContext(AppDispatchContext);
    if (!context) {
        throw new Error('useAppDispatch must be used within an AppProvider');
    }
    return context;
}
