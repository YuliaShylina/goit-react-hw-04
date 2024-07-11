import css from "./ImageCard.module.css";
export default function ImageCard({ src, alt, onClick }) {
  return (
    <div className={css.card}>
      <img src={src} alt={alt} className={css.img} onClick={onClick} />
    </div>
  );
}
