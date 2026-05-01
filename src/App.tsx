import React, { useEffect, useState } from "react";
import "./App.css";
import LeagueList from "./components/LeagueList";
import SidebarMenu, { type MenuOption } from "./components/SidebarMenu";
import TeamList from "./components/TeamList";
import { isAuthenticated } from "./auth/auth";
import { exchangeCode } from "./services/api/api";
import { buildCognitoLoginUrl, buildCognitoLogoutUrl } from "./services/api/cognito";

// TODO NEXT
// editar server para que guarde teams y leagues posta
// agregar form de crear teams
// agregar form de crear leagues
// probar sin usuario (deberia fallar)
// probar con user (deberia andar solo teams)
// probar con admin (deberia andar teams y leagues)

function App() {
  const [activeSection, setActiveSection] = useState("teams");
  const cognitoLoginUrl = buildCognitoLoginUrl();
  const authenticated = isAuthenticated();
  const menuOptions: MenuOption[] = [
    { key: "teams", label: "Teams" },
    { key: "leagues", label: "Leagues" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    window.location.href = buildCognitoLogoutUrl();
  };

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
        {authenticated ? (
          <button className="header-login-button" type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <a className="header-login-button" href={cognitoLoginUrl}>
            Login
          </a>
        )}
      </header>
      <div className="app-body">
        <aside className="app-sidebar">
          <SidebarMenu options={menuOptions} activeKey={activeSection} onChange={setActiveSection} />
        </aside>
        <main className="app-main">
          {activeSection === "teams" ? <TeamList /> : <LeagueList />}
        </main>
      </div>
    </div>
  );
}

export default App;
