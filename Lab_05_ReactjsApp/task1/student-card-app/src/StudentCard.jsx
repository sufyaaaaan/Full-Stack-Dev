import React from 'react';

const StudentCard = ({ name, rollNo, department, university, color = '#f9f9f9' }) => {
    return (
        <div style={{
            backgroundColor: color,
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '24px',
            margin: '16px auto',
            maxWidth: '400px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'left'
        }}>
            <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>{name}</h2>
            <p style={{ margin: '8px 0', color: '#555' }}><strong>Roll No:</strong> {rollNo}</p>
            <p style={{ margin: '8px 0', color: '#555' }}><strong>Department:</strong> {department}</p>
            <p style={{ margin: '8px 0', color: '#555' }}><strong>University:</strong> {university}</p>
        </div>
    );
};

export default StudentCard;
