import { render } from '@testing-library/react';
import App from './App';

jest.mock('./weather/Weather', () => () => <div data-testid="weather" />);
jest.mock('./google-doodle', () => () => <div data-testid="image" />);
jest.mock('./search-bar/SearchBar', () => () => <div data-testid="search" />);
jest.mock('./google-news/GoogleNews', () => () => <div data-testid="news" />);
jest.mock('./google-news', () => () => <div data-testid="tabs" />);
jest.mock('./dialogs/ModalDialog', () => () => <div data-testid="dialogs" />);
test('renders learn react link', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId(/main/)).toBeInTheDocument();
});
