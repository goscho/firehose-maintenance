import { FireHose } from "./types";

/**
 * Creates a slug from an firehose owner marker and number
 * @param firehose
 * @return a slug like "BK-31__1234" that can be used for navigation.
 */
export function createFirehoseSlug(
  firehose: Pick<FireHose, "number" | "owner">,
): string {
  return encodeURIComponent(`${firehose.owner.marker}__${firehose.number}`);
}

/**
 * Parses a slug like "BK-31__1234" into an owner marker and hose number.
 * @param slug
 * @return [owner marker, hose number]
 */
export function parseFirehoseSlug(slug: string): [string, string] {
  return decodeURIComponent(slug).split("__") as [string, string];
}
