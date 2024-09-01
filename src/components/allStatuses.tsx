import { useEffect, useMemo, useState } from "react";
import { getMastodonPosts, isStatus } from "../dataHelpers";
import Status from "./status";

const outboxData = getMastodonPosts();

const PAGE_SIZE = 50;

export const AllStatuses = () => {
  const [showBoosts, setShowBoosts] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const numberOfPages = Math.ceil(outboxData.length / PAGE_SIZE);
  const postsData = useMemo(() => {
    return outboxData
      .filter((post) => {
        return showBoosts ? true : isStatus(post);
      })
      .slice((pageIndex - 1) * PAGE_SIZE, pageIndex * PAGE_SIZE);
  }, [pageIndex, showBoosts]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <>
        <div className="profile-meta">
          {new Intl.NumberFormat().format(outboxData.length)} posts
        </div>
        <div className="status">
          <p>Loading posts...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="profile-controls">
        <label htmlFor="pages">
          Page:{" "}
          <input
            type="number"
            id="pages"
            min={1}
            max={numberOfPages}
            value={pageIndex}
            onChange={(e) => {
              setPageIndex(Number(e.target.value));
            }}
          />{" "}
          of {numberOfPages}
        </label>
        <label htmlFor="boosts-toggle">
          <input
            type="checkbox"
            id="boosts-toggle"
            checked={showBoosts}
            onChange={(e) => {
              setShowBoosts(e.target.checked);
            }}
          />{" "}
          Show boosts
        </label>
      </div>
      {postsData.map((post) => {
        return <Status key={post.id} status={post} isExpanded={false} />;
      })}
    </>
  );
};
