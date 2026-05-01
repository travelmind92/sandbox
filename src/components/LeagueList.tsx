import React, { useCallback } from "react";
import type { ColumnDef } from "./ResourceList";
import ResourceList from "./ResourceList";
import { leaguesService } from "../features/leagues/leaguesService";
import type { League } from "../features/leagues/types";

function LeagueList() {
  const loadLeagues = useCallback(() => leaguesService.getLeagues(), []);

  const columns: ColumnDef<League>[] = [
    {
      key: "name",
      header: "League",
      render: (league) => league.name,
    },
    {
      key: "country",
      header: "Country",
      render: (league) => league.country,
    },
  ];

  return (
    <ResourceList
      title="Leagues"
      subtitle="Browse all available soccer leagues."
      loadingLabel="Loading leagues..."
      emptyLabel="No leagues found."
      errorLabel="Failed to load leagues"
      loadData={loadLeagues}
      columns={columns}
    />
  );
}

export default LeagueList;
