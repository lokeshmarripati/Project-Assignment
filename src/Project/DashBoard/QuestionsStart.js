import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QuestionsStart.css';  // Import the new CSS file

const QuestionsStart = () => {
    const [technologies, setTechnologies] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const res = await axios.get('http://localhost:3000/technologies');
                setTechnologies(res.data);
            } catch (error) {
                console.error('Error fetching technologies:', error);
            }
        };

        fetchTechnologies();
    }, []);

    const handleAttemptClick = (tech) => {
        navigate(`/questions/${tech.name}`);
    };

    return (
        <div className='Questions-choose'>
        <div className="technology-container">
            <h2>Select Technology to Attempt Questions</h2>
            <ul>
                {technologies.map((tech) => (
                    <li key={tech.id}>
                        <button  className="tech-button" onClick={() => handleAttemptClick(tech)} >
                            Attempt {tech.name} Questions
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default QuestionsStart;
