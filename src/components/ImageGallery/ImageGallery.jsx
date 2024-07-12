import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImgClick }) {
  return (
    <ul className={css.list}>
      {images.map((data, index) => (
        <li className={css.item} key={`${data.id}-${index}`}>
          <ImageCard
            src={data.urls.small}
            alt={data.alt_description}
            className={css.card}
            onClick={() => onImgClick(data)}
            likes={data.likes}
          />
        </li>
      ))}
    </ul>
  );
}
