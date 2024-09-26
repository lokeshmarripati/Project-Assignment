import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionForm.css'; // Assuming your styles are in this file

const QuestionForm = () => {
    const [technology, setTechnology] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (technology && numQuestions > 0) {
            navigate(`/create-questions?tech=${technology}&num=${numQuestions}`);
        }
    };

    return (
        <div className="form-background">
            <div className="question-form-container1">
                <form onSubmit={handleSubmit}>
                <h2 className="form-title1">Create a Quiz</h2>
                <label className="form-label1">
                    Select Technology:
                    <select
                        value={technology}
                        onChange={(e) => setTechnology(e.target.value)}
                        className="form-input1"
                    >
                        <option value="">--Select--</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JS</option>
                        <option value="React">React</option>
                    </select>
                </label>
                <br />
                <label className="form-label1">
                    Number of Questions:
                    <input
                        type="number"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                        className="form-input1"
                    />
                </label>
                <br />
                <button type="submit" className="submit-btn1">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default QuestionForm;
