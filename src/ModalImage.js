import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ isOpen, content, setIsModalOpen }) {
  const renderItem = (item) => {
    if (item.match(/\.(jpeg|jpg|gif|png)$/)) {
      return (
        <img
          src={item}
          alt=""
          style={{
            width: "100%",
          }}
        />
      );
    } else if (item.match(/\.(mp4|webm)$/)) {
      return (
        <video
          autoPlay
          muted
          loop
          style={{
            width: "100%",
          }}
        >
          <source src={item} type={`video/${item.split(".").pop()}`} />
          This browser doesn't support video tag.
        </video>
      );
    }
  };

  return isOpen ? (
    <div className="modal modal-image">
      <h2>{content[0]}</h2>
      <div className="masonry-grid">
        {content.slice(1).map((item, index) => (
          <div key={index} className="grid-item">
            {renderItem(item)}
          </div>
        ))}
      </div>
      <button style={{ all: "unset" }} onClick={() => setIsModalOpen(false)}>
        <FontAwesomeIcon icon={faXmark} size="2x" color="#131313" />
      </button>
    </div>
  ) : null;
}
