import React from 'react';

const Greeting = ({ name, timeOfDay, bgColor }) => {
    let greetingMessage = "Hello";
    if (timeOfDay === "Morning") {
        greetingMessage = "Good Morning";
    } else if (timeOfDay === "Afternoon") {
        greetingMessage = "Good Afternoon";
    } else if (timeOfDay === "Evening") {
        greetingMessage = "Good Evening";
    }

    return (
        <div style={{
            backgroundColor: bgColor || '#f0f0f0',
            padding: '24px',
            margin: '20px auto',
            borderRadius: '12px',
            border: '1px solid #ddd',
            maxWidth: '450px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            color: '#333'
        }}>
            <h2 style={{ margin: 0 }}>{greetingMessage}, {name}!</h2>
        </div>
    );
};

export default Greeting;
