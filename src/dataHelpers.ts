import actor from "../archive-data/actor.json";
import memoize from "memoize";
import _ from "lodash";
import outboxRaw from "../archive-data/outbox.json" assert { type: "json" };
import * as Outbox from "./types/outbox";
const outbox = outboxRaw as Outbox.Outbox;

const PUBLIC_RECIPIENT = "https://www.w3.org/ns/activitystreams#Public";

export type OutboxPost = Omit<Outbox.OrderedItem, "object"> & {
  object: Outbox.ObjectClass;
};

export type Boost = OutboxPost & { object: string };

export function isStatus(f: Outbox.OrderedItem): f is OutboxPost {
  return typeof f.object !== "string";
}

export function isBoost(f: Outbox.OrderedItem): f is Boost {
  return typeof f.object === "string";
}

const includePrivatePosts = import.meta.env.SHOW_PRIVATE_POSTS === "true";

const orderedPosts = outbox.orderedItems.toReversed();

function getMastodonPostsBase() {
  return orderedPosts.filter((f) => {
    // Only showing original posts
    if (isStatus(f)) {
      const isUnlisted =
        f.object.cc.includes("https://www.w3.org/ns/activitystreams#Public") &&
        f.object.cc.length === 1 &&
        f.object.to.every((r) => r.endsWith("/followers"));
      const isPublic =
        f.object.to.includes(PUBLIC_RECIPIENT) &&
        f.object.to.length === 1 &&
        f.object.cc.every((r) => r.endsWith("/followers"));

      return includePrivatePosts ? true : isUnlisted || isPublic;
    }

    return true;
  });
}

export const getMastodonPosts = memoize(getMastodonPostsBase);
export const getMastodonPostsById = memoize(() => {
  const posts = getMastodonPosts();

  return _(posts)
    .filter(isStatus)
    .compact()
    .keyBy((f) => f.object.id.split("/").pop() || "")
    .value();
});

export function getMastodonProfile() {
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
