import React from 'react';

const teams = [
  { name: 'Real Madrid', country: 'Spain', league: 'La Liga' },
  { name: 'FC Barcelona', country: 'Spain', league: 'La Liga' },
  { name: 'Manchester City', country: 'England', league: 'Premier League' },
  { name: 'Liverpool', country: 'England', league: 'Premier League' },
  { name: 'Bayern Munich', country: 'Germany', league: 'Bundesliga' },
  { name: 'Paris Saint-Germain', country: 'France', league: 'Ligue 1' },
  { name: 'Inter Milan', country: 'Italy', league: 'Serie A' },
  { name: 'AC Milan', country: 'Italy', league: 'Serie A' },
  { name: 'Ajax', country: 'Netherlands', league: 'Eredivisie' },
  { name: 'Benfica', country: 'Portugal', league: 'Primeira Liga' },
];

function TeamList() {
  return (
    <section className="team-list">
      <div className="team-list-header">
        <h1>Teams</h1>
        <p>Manage your European soccer clubs.</p>
      </div>

      <div className="team-table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Country</th>
              <th>League</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.name}>
                <td>{team.name}</td>
                <td>{team.country}</td>
                <td>{team.league}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TeamList;
