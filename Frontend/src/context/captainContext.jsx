import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCaptainData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found');
                    return;
                }
        
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                // The captain data is in response.data.captain based on the backend response
                setCaptain(response.data); // Access the captain object directly
                setError(null);
            } catch (error) {
                setError('Error fetching captain data');
                setCaptain(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaptainData();
    }, []);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;