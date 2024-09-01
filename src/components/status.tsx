import React from "react";
import { getPostId, isBoost, isStatus } from "../dataHelpers";
import type { OrderedItem } from "../types/outbox";

interface Props {
  status: OrderedItem;
  isExpanded: boolean;
  isMain: boolean;
}

const Status: React.FC<Props> = ({ status, isExpanded, isMain }) => {
  const statusDateString = new Date(status.published).toLocaleString("en", {
    timeStyle: "medium",
    dateStyle: "medium",
  });

  const images = React.useMemo(() => {
    if (isStatus(status) && status.object.attachment) {
      return status.object.attachment
        .filter(
          (f) => f.type === "Document" && f.mediaType.startsWith("image/")
        )
        .filter(Boolean)
        .slice(0, 3);
    }
    return [];
  }, [status]);

  const statusFooter = (
    <div className="status-footer">
      <time className="status-time" dateTime={status.published}>
        {statusDateString}
      </time>
      {isStatus(status) && status.object.inReplyTo && (
        <span className="status-time">Reply</span>
      )}
      {isStatus(status) && (
        <a className="status-link" href={`/status/${getPostId(status)}#main`}>
          Link
        </a>
      )}
    </div>
  );

  if (isBoost(status)) {
    return (
      <div className="status">
        <div className="status-body">
          <p>
            Boosted <a href={status.object}>{status.object}</a>
          </p>
        </div>
        {statusFooter}
      </div>
    );
  }

  if (isStatus(status)) {
    const statusContent = (
      <>
        <div
          className="status-body"
          dangerouslySetInnerHTML={{ __html: status.object.content }}
        />
        {(images.length && (
          <div
            className="status-images"
            style={{
              aspectRatio:
                images.length === 1
                  ? `${images[0].width} / ${images[0].height}`
                  : undefined,
            }}
          >
            {images.map((f, index) => {
              console.log(f);
              return (
                <a key={index} href={f.url}>
                  <img
                    src={f.url}
                    height={f.height}
                    width={f.width}
                    alt={f.summary || "attachment"}
                    className="status-image"
                    loading="lazy"
                  />
                </a>
              );
            })}
          </div>
        )) ||
          null}
      </>
    );

    if (status.object.summary) {
      return (
        <div className="status">
          <details className="status-details" open={isExpanded}>
            <summary>{status.object.summary}</summary>
            {statusContent}
          </details>
          {statusFooter}
        </div>
      );
    }

    return (
      <article className="status" id={isMain ? "main" : undefined}>
        {statusContent}
        {statusFooter}
      </article>
    );
  }

  return null;
};

export default Status;
