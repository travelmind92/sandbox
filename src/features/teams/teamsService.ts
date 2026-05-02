import { apiFetch } from "../../services/api/fetch";
import { getAll } from "../../services/api/getAll";
import type { Team } from "./types";

export type TeamWritePayload = {
  name: string;
  country: string;
  leagueId: string;
};

export const teamsService = {
  getTeams(): Promise<Team[]> {
    return getAll<Team>("teams", false);
  },

  async putTeam(id: string, payload: TeamWritePayload): Promise<void> {
    const path = `/teams/${encodeURIComponent(id)}`;
    const res = await apiFetch(path, true, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Failed to save team (${res.status})`);
    }
  },
};
