import React, { useState } from 'react';
import { API } from 'aws-amplify';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const triggerPipeline = async () => {
    try {
      const response = await API.post('RealEstateAPI', '/trigger', {});
      alert(response.message);
    } catch (error) {
      console.error('Error triggering pipeline:', error.response ? error.response.data : error.message);
    }
  };

  const getData = async () => {
    try {
      const response = await API.get('RealEstateAPI', '/data', {});
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };

  const getPrediction = async () => {
    try {
      const response = await API.get('RealEstateAPI', '/predict', {
        queryStringParameters: {
          city: 'SAN FRANCISCO',
          state_code: 'CA'
        }
      });
      setPrediction(response.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="App">
      <h1>Real Estate Analytics</h1>
      <button onClick={triggerPipeline}>Run ETL Pipeline</button>
      <button onClick={getData}>Load Data</button>
      <button onClick={getPrediction}>Get Prediction</button>

      {data.length > 0 && (
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
      )}

      {prediction && <h2>Predicted Price: ${prediction}</h2>}
    </div>
  );
}

export default App;