import React from 'react';
import './App.css';
import TeamList from './components/TeamList';

function App() {
  return (
    <div className="App">
      <header className="app-header">Sandbox</header>
      <div className="app-body">
        <aside className="app-sidebar">
          <nav>
            <button className="sidebar-item sidebar-item-active" type="button">
              Teams
            </button>
          </nav>
        </aside>
        <main className="app-main">
          <TeamList />
        </main>
      </div>
    </div>
  );
}

export default App;
