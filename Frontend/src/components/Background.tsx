import React, { ReactNode } from 'react';

interface BackgroundProps {
    children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
    return (
        <div style={{
            backgroundImage: `url('./src/assets/images/Background.jpg')`,
            backgroundSize: 'auto',
            backgroundPosition: 'center',
            minHeight: '100vh',
        }}>
            {children}
        </div>
    );
};

export default Background;
