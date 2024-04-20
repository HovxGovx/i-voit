import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComptePage = () => {
    const [sessionInfo, setSessionInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessionInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8081/session-info', { withCredentials: true });
                setSessionInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching session info:', error);
            }
        };

        fetchSessionInfo();
    }, []);

    if (loading) {
        return <>Loading...</>;
    }

    if (!sessionInfo) {
        return <>No session found</>;
    }

    const { session, user } = sessionInfo;

    return (
        <div>
            <h2>Session Info</h2>
            <p>Session Data:</p>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <p>User Data:</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
};

export default ComptePage;
