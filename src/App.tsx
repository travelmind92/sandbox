import React, { useEffect } from 'react';
import './App.css';
import TeamList from './components/TeamList';
import { buildCognitoLoginUrl } from './auth/cognito';
import { exchangeCode } from './services/api/api';

function App() {
  const cognitoLoginUrl = buildCognitoLoginUrl();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;
  
    const exchangeKey = `cognito_code_used_${code}`;
    if (sessionStorage.getItem(exchangeKey)) return;
  
    sessionStorage.setItem(exchangeKey, "true");
  
    window.history.replaceState({}, document.title, "/");
  
    exchangeCode(code)
      .then((tokens) => {
        localStorage.setItem("id_token", tokens.id_token);
        localStorage.setItem("access_token", tokens.access_token);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <span>Sandbox</span>
        <a className="header-login-button" href={cognitoLoginUrl}>
          Login
        </a>
      </header>
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
