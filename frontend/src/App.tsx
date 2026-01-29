import React from 'react';
import MapView from './components/MapView';
import Controls from './components/Controls';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Controls />
      <MapView />
    </div>
  );
};

export default App;
