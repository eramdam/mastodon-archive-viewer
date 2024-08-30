import Astro from "astro";
import _ from "lodash";
import actor from "../archive-data/actor.json";

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
