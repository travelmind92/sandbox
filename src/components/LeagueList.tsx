import React, { useCallback, useState } from "react";
import LeagueForm from "./LeagueForm";
import type { ColumnDef } from "./ResourceList";
import ResourceList from "./ResourceList";
import { leaguesService } from "../features/leagues/leaguesService";
import type { League } from "../features/leagues/types";

function LeagueList() {
  const [screen, setScreen] = useState<"list" | "form">("list");
  const [formInitialLeague, setFormInitialLeague] = useState<League | undefined>(undefined);

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
    {
      key: "actions",
      header: "",
      render: (league) => (
        <button
          className="resource-table-link-button"
          type="button"
          onClick={() => {
            setFormInitialLeague(league);
            setScreen("form");
          }}
        >
          Edit
        </button>
      ),
    },
  ];

  if (screen === "form") {
    return (
      <LeagueForm
        initialLeague={formInitialLeague}
        onCancel={() => setScreen("list")}
        onSaved={() => setScreen("list")}
      />
    );
  }

  return (
    <ResourceList
      title="Leagues"
      subtitle="Browse and manage soccer leagues."
      loadingLabel="Loading leagues..."
      emptyLabel="No leagues found."
      errorLabel="Failed to load leagues"
      loadData={loadLeagues}
      columns={columns}
      headerActions={
        <button
          className="resource-list-primary-button"
          type="button"
          onClick={() => {
            setFormInitialLeague(undefined);
            setScreen("form");
          }}
        >
          New league
        </button>
      }
    />
  );
}

export default LeagueList;
