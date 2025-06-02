import React, { createContext, useContext, useState } from 'react';

interface VisualizationContextType {
    size: number;
    setSize: (size: number) => void;
}

const VisualizationContext = createContext<VisualizationContextType | undefined>(undefined);

export const VisualizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [size, setSize] = useState(1); // 1 is default size, can be adjusted between 0.5 and 2

    return (
        <VisualizationContext.Provider value={{ size, setSize }}>
            {children}
        </VisualizationContext.Provider>
    );
};

export const useVisualization = () => {
    const context = useContext(VisualizationContext);
    if (context === undefined) {
        throw new Error('useVisualization must be used within a VisualizationProvider');
    }
    return context;
}; 