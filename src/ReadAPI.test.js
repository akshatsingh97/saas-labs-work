import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReadAPI from './ReadAPI';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils'

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            {
                "s.no": 1,
                "amt.pledged": 1000,
                "percentage.funded": 25,
            },
            {
                "s.no": 2,
                "amt.pledged": 500,
                "percentage.funded": 10,
            },
        ])
    })
)

describe('ReadAPI Component', () => {

    test('handles API error correctly', async () => {
        global.fetch.mockImplementationOnce(() =>
          Promise.reject(new Error('Failed to fetch data'))
        );
    
        render(<ReadAPI />);
    
        await waitFor(() => {
          expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
        });
    });
})