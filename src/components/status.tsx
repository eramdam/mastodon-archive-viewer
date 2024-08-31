import React from "react";
import type { OrderedItem } from "../types/outbox";
import { isBoost, isStatus } from "../dataHelpers";

interface Props {
  status: OrderedItem;
  isExpanded: boolean;
}

const Status: React.FC<Props> = ({ status, isExpanded }) => {
  const statusDateString = new Date(status.published).toLocaleString();

  const images = React.useMemo(() => {
    if (isStatus(status) && status.object.attachment) {
      return status.object.attachment
        .filter(
          (f) => f.type === "Document" && f.mediaType.startsWith("image/")
        )
        .filter(Boolean);
    }
    return [];
  }, [status]);

  const statusFooter = (
    <div className="status-footer">
      <time dateTime={status.published}>{statusDateString}</time>{" "}
      {isStatus(status) && (
        <a href={`/${status.object.id.split("/").pop()}`}>🔗</a>
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
        <div className="status-images">
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
