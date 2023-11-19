import React, { useState } from 'react';

function Triangulation() {
    const [response, setResponse] = useState('');

    const runPythonScript = async () => {
        const res = await fetch('http://localhost:3000/run-python-triangulate');
        const data = await res.text();
        setResponse(data);
    };

    return (
        <div>
            <button onClick={runPythonScript}>Run Python Script</button>
            <p>Response: {response}</p>
        </div>
    );
}

export default Triangulation;
