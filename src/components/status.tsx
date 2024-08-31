import React from "react";
import type { OrderedItem } from "../types/outbox";
import { isBoost, isStatus } from "../dataHelpers";

interface Props {
  status: OrderedItem;
  isExpanded: boolean;
}

const Status: React.FC<Props> = ({ status, isExpanded }) => {
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
      {isStatus(status) && (
        <a
          className="status-link"
          href={`/status/${status.object.id.split("/").pop()}`}
        >
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
            RT <a href={status.object}>{status.object}</a>
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
            {images.map((f, index) => (
              <a key={index} href={f.url}>
                <img
                  src={f.url}
                  height={f.height}
                  width={f.width}
                  alt=""
                  className="status-image"
                />
              </a>
            ))}
          </div>
        )) ||
          null}
      </>
    );

    if (status.object.summary) {
      return (
        <div className="status">
          <details open={isExpanded}>
            <summary>{status.object.summary}</summary>
            {statusContent}
          </details>
          {statusFooter}
        </div>
      );
    }

    return (
      <div className="status">
        {statusContent}
        {statusFooter}
      </div>
    );
  }

  return null;
};

export default Status;
