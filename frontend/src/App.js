import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic) {
            alert('Please enter a topic.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/generate-description',
                { topic }
            );
            setDescription(response.data.description);
        } catch (error) {
            console.error(error);
            alert('An error occurred while generating the description.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Topic Description Generator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter Topic:</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>
                <button type="submit">Generate Description</button>
            </form>
            {loading && <p>Loading...</p>}
            {description && (
                <div>
                    <h2>Description</h2>
                    <p>{description}</p>
                </div>
            )}
        </div>
    );
};

export default App;
