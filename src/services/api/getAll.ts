import { apiFetch } from "./fetch";

function parseListBody<T>(body: unknown, resource: string): T[] {
  if (Array.isArray(body)) {
    return body as T[];
  }
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    const list = record.data ?? record[resource];
    if (Array.isArray(list)) {
      return list as T[];
    }
  }
  throw new Error(`Unexpected response for /public/${resource}`);
}

/**
 * Fetches all rows for a public table at `/public/{resource}`.
 * Accepts a JSON array or an object with `data` or a key matching `resource` (e.g. `teams`).
 */
export async function getAll<T>(
  resource: string,
  auth: boolean = false
): Promise<T[]> {
  const segment = resource.replace(/^\/+/, "").replace(/\/+$/, "");
  const path = `/public/${segment}`;
  const res = await apiFetch(path, auth, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Failed to load ${segment} (${res.status})`);
  }
  return parseListBody<T>(await res.json(), segment);
}
