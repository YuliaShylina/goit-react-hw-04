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
  const [modalImg, setModalImg] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);

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

  const handleOpenModal = (currentId) => {
    const currentImg = images.find(({ id }) => id === currentId);
    setModalImg(currentImg);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImg(null);
  };

  const onLoadMore = () => setPage((prevPage) => prevPage + 1);
  const visibleBtnMore = () => images.length !== 0 && page < totalPages;

  return (
    <>
      <SearchBar handleSearch={onSearch} />
      <Toaster position="top-right" />
      <ImageGallery images={images} handleOpenModel={handleOpenModal} />
      {loader && <Loader />}
      {!loader && visibleBtnMore() && <LoadMoreBtn onLoadMore={onLoadMore} />}
      <ImageModal
        isOpen={openModal}
        closeModal={handleCloseModal}
        imageUrl={modalImg?.urls?.regular}
        altDescription={modalImg?.alt_description}
        likes={modalImg?.likes}
        createdAt={modalImg?.created_at}
        description={modalImg?.description}
      />
    </>
  );
}

export default App;
