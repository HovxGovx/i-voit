import React, { useState, useEffect } from 'react';

const ComptePage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [sessionInfo, setSessionInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchSessionInfo = async () => {
        try {
          const response = await fetch('http://localhost:8081/session-info');
          if (!response.ok) {
            throw new Error('Failed to fetch session info');
          }
          const data = await response.json();
          console.log(data.sessionData);
          setUserInfo(data.userData);
          setSessionInfo(data.sessionData);

          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
  
      fetchSessionInfo();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!userInfo) {
      return <div>No user info available</div>;
    }
  
    return (
      <div className='home'>
        <h2>User Information</h2>
        <div>
          <strong>Name:</strong> {userInfo.user_id}
        </div>
        <div>
          <strong>Session:</strong> {sessionInfo.username}
        </div>
      </div>
    );
  }

export default ComptePage;
