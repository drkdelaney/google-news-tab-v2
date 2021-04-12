import { render } from '@testing-library/react';
import App from './App';

jest.mock('./Main', () => () => <div data-testid="main" />);
test('renders learn react link', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId(/main/)).toBeInTheDocument();
});
