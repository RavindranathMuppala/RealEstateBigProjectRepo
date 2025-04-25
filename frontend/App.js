import React, { useState } from 'react';
import Amplify, { API } from 'aws-amplify';
import awsExports from './aws-exports';
import './App.css';

Amplify.configure(awsExports);

function App() {
    const [prediction, setPrediction] = useState(null);
    const [data, setData] = useState([]);

    const triggerPipeline = async () => {
        try {
            const response = await API.post('RealEstateAPI', '/trigger');
            alert(response.message);
        } catch (error) {
            alert('Error triggering pipeline: ' + error);
        }
    };

    const getData = async () => {
        try {
            const response = await API.get('RealEstateAPI', '/data');
            setData(response);
        } catch (error) {
            alert('Error fetching data: ' + error);
        }
    };

    const getPrediction = async () => {
        try {
            const response = await API.get('RealEstateAPI', '/predict', {
                body: {
                    city: 'SAN FRANCISCO',
                    state_code: 'CA'
                }
            });
            setPrediction(response.prediction);
        } catch (error) {
            alert('Error getting prediction: ' + error);
        }
    };

    return (
        <div className="App">
            <h1>Real Estate Analytics</h1>
            <button onClick={triggerPipeline}>Run ETL Pipeline</button>
            <button onClick={getData}>Load Data</button>
            <button onClick={getPrediction}>Get Prediction</button>
            {prediction && <h2>Predicted Price: ${prediction}</h2>}
            <h2>Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>State</th>
                        <th>Median Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.city}</td>
                            <td>{item.state_code}</td>
                            <td>{item.median_sale_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;