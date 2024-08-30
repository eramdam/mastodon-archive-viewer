import actor from "../archive-data/actor.json";
import outboxRaw from "../archive-data/outbox.json" assert { type: "json" };
import type { Outbox } from "./types/outbox";
const outbox = outboxRaw as Outbox;

export function getOutboxData() {
  return outbox.orderedItems.filter((f) => f.type === "Create").slice(0, 10);
}

export function getActorData() {
  return actor;
}

export function getProfileData() {
  return {
    name: actor.name,
    preferredUsername: actor.preferredUsername,
    summary: actor.summary,
    published: actor.published,
    attachment: actor.attachment,
    icon: actor.icon,
    image: actor.image,
  };
}
