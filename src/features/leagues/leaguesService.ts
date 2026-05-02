import { apiFetch } from "../../services/api/fetch";
import { getAll } from "../../services/api/getAll";
import type { League } from "./types";

export type LeagueWritePayload = {
  name: string;
  country: string;
};

export const leaguesService = {
  getLeagues(): Promise<League[]> {
    return getAll<League>("leagues", false);
  },

  async putLeague(id: string, payload: LeagueWritePayload): Promise<void> {
    const path = `/leagues/${encodeURIComponent(id)}`;
    const res = await apiFetch(path, true, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Failed to save league (${res.status})`);
    }
  },
};
