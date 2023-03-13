import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ isOpen, content, setIsModalOpen }) {
  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <h2>{content[0]}</h2>
        <p>{content[1]}</p>
      </div>
      <button style={{ all: "unset" }} onClick={() => setIsModalOpen(false)}>
        <FontAwesomeIcon icon={faXmark} size="2x" color="#131313" />
      </button>
    </div>
  ) : null;
}
