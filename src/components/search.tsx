import Fuse from "fuse.js";
import { convert } from "html-to-text";
import { useMemo, useState } from "react";
import { getMastodonPostsById } from "../dataHelpers";
import Status from "./status";

interface SearchDocument {
  id: string;
  content: string;
  published: string;
}

const postsById = getMastodonPostsById();

const postsDocuments: SearchDocument[] = Object.entries(postsById).map(
  ([id, post]) => {
    return {
      id: id,
      content: convert(post.object.content),
      published: post.published,
    };
  }
);

const fuse = new Fuse<SearchDocument>(postsDocuments, {
  includeScore: true,
  keys: ["content"],
  ignoreLocation: true,
  isCaseSensitive: false,
});

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const matchedPosts = useSearch(searchTerm, 50);

  return (
    <>
      <div className="statuses-search">
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      {(matchedPosts || []).map((result) => {
        return (
          <Status
            isMain={false}
            key={result.id}
            status={result}
            isExpanded={false}
          />
        );
      })}
    </>
  );
};

function useSearch(query: string, limit: number) {
  return useMemo(() => {
    const rawSearch = fuse.search(query, {
      limit,
    });

    return rawSearch.map((result) => {
      return postsById[result.item.id];
    });
  }, [query, limit]);
}
