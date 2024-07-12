import { useEffect, useState } from "react";
import fetchImages from "./unsplashAPI";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [onImg, setOnImg] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoader(true);
    fetchImages(query, page)
      .then(({ data }) => {
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
        if (!data.results.length) {
          toast.error(`No results found for '${query}'`);
        }
      })
      .catch(() => {
        toast.error("Error! Try reloading the page, please");
      })
      .finally(() => setLoader(false));
  }, [query, page]);

  const onSearch = (query) => {
    if (!query) toast.error("Please, enter the word");
    setQuery(query);
    setImages([]);
    setTotalPages(0);
    setPage(1);
  };

  const modalOpen = (image) => {
    setOnImg(image);
    setOpenModal(true);
  };

  const modalClosed = () => {
    setOnImg(null);
    setOpenModal(false);
  };

  const onLoadMore = () => setPage((prevPage) => prevPage + 1);
  const visibleBtnMore = () => images.length !== 0 && page < totalPages;

  return (
    <>
      <SearchBar handleSearch={onSearch} />
      <Toaster position="top-right" />
      <ImageGallery images={images} onImgClick={modalOpen} />
      {loader && <Loader />}
      {!loader && visibleBtnMore() && <LoadMoreBtn onLoadMore={onLoadMore} />}
      <ImageModal isOpen={openModal} onRequestClose={modalClosed} img={onImg} />
    </>
  );
}

export default App;
