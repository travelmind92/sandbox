import { getAll } from "../../services/api/getAll";
import type { League } from "./types";

export const leaguesService = {
  getLeagues(): Promise<League[]> {
    return getAll<League>("leagues", false);
  },
};
