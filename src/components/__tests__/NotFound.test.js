import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from '../NotFound';


describe('NotFound component', () => {
    test('renders correctly', () => {
        const { getByText } = render(
        <Router>
            <NotFound />
        </Router>
        );

        expect(getByText(
            'Zoom Off!!! the page you\'re looking for does not exist'
            )
        ).toBeInTheDocument();
        expect(getByText('Home')).toBeInTheDocument();
    });

    test('redirects to home page on button click', () => {
        const { getByText } = render(
            <Router>
                <NotFound />
            </Router>
        );

        fireEvent.click(getByText('Home'));
    });
});