import { getAll } from "../../services/api/getAll";
import type { Team } from "./types";

export const teamsService = {
  getTeams(): Promise<Team[]> {
    return getAll<Team>("teams", false);
  },
};
