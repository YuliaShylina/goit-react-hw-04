import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images, handleOpenModel }) {
  return (
    <ul className={css.list}>
      {images.map((data, index) => (
        <li
          className={css.item}
          key={`${data.id}-${index}`}
          onClick={() => handleOpenModel(data.id)}
        >
          <ImageCard src={data.urls.small} alt={data.alt_description} />
        </li>
      ))}
    </ul>
  );
}
