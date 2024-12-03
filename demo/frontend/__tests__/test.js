import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/preact';
import { MemoryRouter } from 'react-router-dom';
import Home from '../src/pages/Home';

const renderComponent = (component) => render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
        {component}
    </MemoryRouter>
);

test('Renderiza a página de boas vindas', () => {
    renderComponent(<Home/>);
    const linkElement = screen.getByText(/Painel CIN/i);
    expect(linkElement).toBeInTheDocument();
});
