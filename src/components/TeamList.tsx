import React, { useCallback } from "react";
import type { ColumnDef } from "./ResourceList";
import ResourceList from "./ResourceList";
import { leaguesService } from "../features/leagues/leaguesService";
import { teamsService } from "../features/teams/teamsService";
import type { Team } from "../features/teams/types";

type TeamRow = Team & { leagueName: string };

function TeamList() {
  const loadTeams = useCallback(async () => {
    const [teams, leagues] = await Promise.all([
      teamsService.getTeams(),
      leaguesService.getLeagues(),
    ]);
    const nameByLeagueId = new Map(leagues.map((l) => [l.id, l.name]));
    return teams.map<TeamRow>((team) => ({
      ...team,
      leagueName: nameByLeagueId.get(team.leagueId) ?? team.leagueId,
    }));
  }, []);

  const columns: ColumnDef<TeamRow>[] = [
    {
      key: "name",
      header: "Team",
      render: (team) => team.name,
    },
    {
      key: "country",
      header: "Country",
      render: (team) => team.country,
    },
    {
      key: "league",
      header: "League",
      render: (team) => team.leagueName,
    },
  ];

  return (
    <ResourceList
      title="Teams"
      subtitle="Manage your European soccer clubs."
      loadingLabel="Loading teams..."
      emptyLabel="No teams found."
      errorLabel="Failed to load teams"
      loadData={loadTeams}
      columns={columns}
    />
  );
}

export default TeamList;
