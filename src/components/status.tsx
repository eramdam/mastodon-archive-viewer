import React from "react";
import { getPathWithBase, getPostId, isBoost, isStatus } from "../dataHelpers";
import type { Attachment, OrderedItem } from "../types/outbox";
import { Blurhash } from "react-blurhash";

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
        .filter((f) => f.type === "Document")
        .filter(Boolean);
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
        <a
          className="status-link"
          href={getPathWithBase(`/status/${getPostId(status)}#main`)}
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
            Boosted <a href={status.object}>{status.object}</a>
          </p>
        </div>
        {statusFooter}
      </div>
    );
  }

  if (isStatus(status)) {
    const hasSensitiveContent = status.object.sensitive;

    const statusContent = (
      <>
        <div
          className="status-body"
          dangerouslySetInnerHTML={{ __html: status.object.content }}
        />

        {(images.length && (
          <div className="status-media">
            {hasSensitiveContent && (
              <label
                className="status-image-toggle"
                htmlFor={`${status.id}-media-toggle`}
              >
                {eyeSlashIcon}
                <input type="checkbox" id={`${status.id}-media-toggle`} />
                <span>Click to show</span>
              </label>
            )}
            <div
              className="media-gallery"
              style={{
                aspectRatio:
                  images.length === 1
                    ? `${images[0].width} / ${images[0].height}`
                    : undefined,
              }}
            >
              {images.map((f, index) => {
                return (
                  <a key={index} href={f.url}>
                    {f.blurhash && hasSensitiveContent && (
                      <Blurhash
                        hash={f.blurhash}
                        height={f.height}
                        width={f.width}
                        resolutionX={32}
                        resolutionY={32}
                        punch={1}
                      ></Blurhash>
                    )}
                    {renderMedia(f)}
                  </a>
                );
              })}
            </div>
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

function renderMedia(f: Attachment) {
  if (f.mediaType.startsWith("image/")) {
    return (
      <img
        src={getPathWithBase(f.url)}
        height={f.height}
        width={f.width}
        alt={f.summary || "attachment"}
        className="status-image"
        loading="lazy"
      />
    );
  }

  if (f.mediaType.startsWith("video/")) {
    return (
      <video
        src={getPathWithBase(f.url)}
        height={f.height}
        width={f.width}
        className="status-image"
        controls
      />
    );
  }

  if (f.mediaType.startsWith("audio/")) {
    return (
      <>
        <img
          src={
            (f.icon?.url && getPathWithBase(f.icon.url)) ||
            getPathWithBase("default-image.png")
          }
          height={f.height || 1500}
          width={f.width || 500}
          alt={f.summary || "attachment"}
          className="status-image"
          loading="lazy"
        />
        <audio src={getPathWithBase(f.url)} controls />
      </>
    );
  }

  return null;
}

const eyeSlashIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
    aria-hidden="true"
  >
    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"></path>
  </svg>
);
