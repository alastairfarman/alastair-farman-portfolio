import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ isOpen, content, setIsModalOpen }) {
  return isOpen ? (
    <div className="modal">
      <h2>{content[0]}</h2>
      <div className="modal-content">
        <div>
          <p>{content[1]}</p>
          {content[4] ? (
            <a
              href={content[4]}
              target="_blank"
              rel="noreferrer"
              title="Opens in a new tab"
            >
              {content[4]}
            </a>
          ) : (
            ""
          )}
        </div>
        <div className="modal-graphics">
          <img
            src={content[2]}
            alt=""
            style={{
              width: "100%",
              margin: "1rem",
              maxHeight: "400px",
              maxWidth: "400px",
            }}
          />
          <video
            autoPlay
            muted
            loop
            style={{
              width: "100%",
              margin: "1rem",
              maxHeight: "400px",
              maxWidth: "400px",
            }}
          >
            <source src={content[3]} type="video/mp4" />
            This browser doesn't support video tag.
          </video>
        </div>
      </div>
      <button style={{ all: "unset" }} onClick={() => setIsModalOpen(false)}>
        <FontAwesomeIcon icon={faXmark} size="2x" color="#131313" />
      </button>
    </div>
  ) : null;
}
