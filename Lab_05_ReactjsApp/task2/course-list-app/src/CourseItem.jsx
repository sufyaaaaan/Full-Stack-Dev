import React from 'react';

const CourseItem = ({ courseName, instructor, duration, type }) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            margin: '16px auto',
            maxWidth: '450px',
            backgroundColor: type === 'Online' ? '#ebf8fa' : '#fdf6e3',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            textAlign: 'left'
        }}>
            <h3 style={{ marginTop: '0', color: '#333' }}>{courseName}</h3>
            <p style={{ margin: '8px 0', color: '#555' }}><strong>Instructor:</strong> {instructor}</p>
            <p style={{ margin: '8px 0', color: '#555' }}><strong>Duration:</strong> {duration}</p>
            <p style={{ margin: '12px 0 0 0' }}>
                <span style={{
                    backgroundColor: type === 'Online' ? '#009688' : '#ff9800',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                }}>
                    {type}
                </span>
            </p>
        </div>
    );
};

export default CourseItem;
