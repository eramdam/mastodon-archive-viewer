import FlexSearch from "flexsearch";
import { convert } from "html-to-text";
import { getMastodonPostsById } from "../dataHelpers";
import { useMemo, useState } from "react";
import Status from "./status";

interface SearchDocument {
  id: string;
  content: string;
  published: string;
}
const index = new FlexSearch.Document<SearchDocument>({
  tokenize: "full",
  document: {
    id: "id",
    index: ["content"],
  },
});
const postsById = getMastodonPostsById();

Object.entries(postsById).forEach(([id, post]) => {
  index.add({
    id: id,
    content: convert(post.object.content),
    published: post.published,
  });
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
    const rawSearch = index.search(query, limit);

    return rawSearch.flatMap((f) => f.result.map((r) => postsById[String(r)]));
  }, [query, limit]);
}
