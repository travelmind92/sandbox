import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import ResourceFormShell from "./ResourceFormShell";
import type { League } from "../features/leagues/types";
import { leaguesService } from "../features/leagues/leaguesService";
import { teamsService } from "../features/teams/teamsService";
import type { Team } from "../features/teams/types";

type Props = {
  /** When set, the form edits this team; otherwise creates a new team (new UUID). */
  initialTeam?: Team;
  onCancel: () => void;
  onSaved: () => void;
};

function CreateTeamForm({ initialTeam, onCancel, onSaved }: Props) {
  const isEdit = Boolean(initialTeam);
  const [teamId] = useState(() => initialTeam?.id ?? crypto.randomUUID());
  const [name, setName] = useState(initialTeam?.name ?? "");
  const [country, setCountry] = useState(initialTeam?.country ?? "");
  const [leagueId, setLeagueId] = useState(initialTeam?.leagueId ?? "");
  const [leagues, setLeagues] = useState<League[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    leaguesService
      .getLeagues()
      .then((list) => {
        if (!cancelled) {
          setLeagues(list);
          if (list.length > 0) {
            setLeagueId((prev) => prev || list[0].id);
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "Failed to load leagues");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!name.trim() || !country.trim() || !leagueId) {
      setSubmitError("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      await teamsService.putTeam(teamId, {
        name: name.trim(),
        country: country.trim(),
        leagueId,
      });
      onSaved();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save team");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ResourceFormShell
      title={isEdit ? "Edit team" : "New team"}
      subtitle={
        isEdit
          ? "Update this team's name, country, or league."
          : "Add a team with a name, country, and league."
      }
      loadError={loadError}
      submitError={submitError}
      submitting={submitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <FormField id="team-name" label="Name">
        <input
          id="team-name"
          name="name"
          type="text"
          autoComplete="organization"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
      </FormField>
      <FormField id="team-country" label="Country">
        <input
          id="team-country"
          name="country"
          type="text"
          autoComplete="country-name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={submitting}
        />
      </FormField>
      <FormField id="team-league" label="League">
        <select
          id="team-league"
          name="leagueId"
          value={leagueId}
          onChange={(e) => setLeagueId(e.target.value)}
          disabled={submitting || leagues === null || leagues.length === 0}
        >
          {leagues === null && <option value="">Loading leagues…</option>}
          {leagues && leagues.length === 0 && <option value="">No leagues available</option>}
          {leagues?.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
      </FormField>
    </ResourceFormShell>
  );
}

export default CreateTeamForm;
