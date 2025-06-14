import React from 'react';
import { useNavigate } from 'react-router';

const PlayListPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 9999,
          color: 'white',
          fontSize: 50,
          backgroundColor: 'rgba(0, 0, 0, 1)',
          padding: 20,
        }}
      >
        <div style={{ fontSize: 50 }}>PlayListPage</div>
        <button style={{ fontSize: 50 }} onClick={() => navigate('/')}>
          Go To Player
        </button>
      </div>
    </div>
  );
};

export default PlayListPage;
