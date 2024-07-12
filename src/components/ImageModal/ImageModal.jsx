import React from "react";
import ReactModal from "react-modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiLike } from "react-icons/bi";
import { format } from "date-fns";
import css from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

export default function ImageModal({ isOpen, onRequestClose, img }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      closeTimeoutMS={200}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName={css.overlay}
      className={css.modal}
    >
      {img && (
        <div className={css.content} onClick={(e) => e.stopPropagation()}>
          <img
            src={img.urls.regular}
            alt={img.alt_description}
            className={css.modalImage}
          />
          <div className={css.info}>
            <p>
              <BiLike size={20} />
              Likes: {img.likes}
            </p>
            <p>Created at: {format(new Date(img.created_at), "Pp")}</p>
            {img.description && <p>Description: {img.description}</p>}
          </div>
          <button onClick={onRequestClose} className={css.closeBtn}>
            <IoIosCloseCircleOutline size={40} />
          </button>
        </div>
      )}
    </ReactModal>
  );
}
