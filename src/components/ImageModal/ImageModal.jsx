import css from "./ImageModal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiLike } from "react-icons/bi";
import { format } from "date-fns";
import { useEffect } from "react";

export default function ImageModal({
  isOpen,
  closeModal,
  imageUrl,
  altDescription,
  likes,
  createdAt,
  description,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt={altDescription} className={css.image} />
        <div className={css.info}>
          <p>
            <BiLike size={24} />
            Likes: {likes}
          </p>
          <p>Created at: {format(new Date(createdAt), "Pp")}</p>
          {description && <p>Description: {description}</p>}
        </div>
        <button onClick={closeModal} className={css.closeBtn}>
          <IoIosCloseCircleOutline size={40} />
        </button>
      </div>
    </div>
  );
}
