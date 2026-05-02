import React, { useState } from "react";
import FormField from "./FormField";
import ResourceFormShell from "./ResourceFormShell";
import { leaguesService } from "../features/leagues/leaguesService";
import type { League } from "../features/leagues/types";

type Props = {
  /** When set, the form edits this league; otherwise creates a new league (new UUID). */
  initialLeague?: League;
  onCancel: () => void;
  onSaved: () => void;
};

function LeagueForm({ initialLeague, onCancel, onSaved }: Props) {
  const isEdit = Boolean(initialLeague);
  const [leagueId] = useState(() => initialLeague?.id ?? crypto.randomUUID());
  const [name, setName] = useState(initialLeague?.name ?? "");
  const [country, setCountry] = useState(initialLeague?.country ?? "");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!name.trim() || !country.trim()) {
      setSubmitError("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      await leaguesService.putLeague(leagueId, {
        name: name.trim(),
        country: country.trim(),
      });
      onSaved();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save league");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ResourceFormShell
      title={isEdit ? "Edit league" : "New league"}
      subtitle={
        isEdit
          ? "Update this league's name or country."
          : "Add a league with a name and country."
      }
      loadError={null}
      submitError={submitError}
      submitting={submitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <FormField id="league-name" label="Name">
        <input
          id="league-name"
          name="name"
          type="text"
          autoComplete="organization"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
      </FormField>
      <FormField id="league-country" label="Country">
        <input
          id="league-country"
          name="country"
          type="text"
          autoComplete="country-name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={submitting}
        />
      </FormField>
    </ResourceFormShell>
  );
}

export default LeagueForm;
