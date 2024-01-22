import React, { useState, useEffect } from 'react';

const DataFetchingComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(' http://127.0.0.1:80/strategy/strategies')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Render your data here */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DataFetchingComponent;
