import { Toaster, toast } from 'react-hot-toast';

import { getImages } from 'services';
import { Button, ImageGallery, Loader, Searchbar, Modal } from 'components';
import { useEffect, useState } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const onSearch = payload => {
    if (payload !== query) {
      setQuery(payload);
      setPage(1);
      setTotalPages(1);
      setImages([]);
    } else toast.success('Already loaded. Try something different');
  };

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    getImages(query, page)
      .then(({ images, totalPages }) => {
        setImages(prev => [...prev, ...images]);
        setTotalPages(totalPages);
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  }, [loading, page, query]);

  const onLoadMoreClick = () => {
    setPage(page + 1);
  };

  const isGallery = images.length > 0;
  const isButton = page < totalPages;
  return (
    <div className="App">
      <Searchbar onSearch={onSearch} disable={loading} />
      <Toaster position="top-right" reverseOrder={false} />
      {isGallery && (
        <ImageGallery images={images} onImageClick={setModalImage} />
      )}
      {loading ? <Loader /> : isButton && <Button onClick={onLoadMoreClick} />}
      {modalImage && <Modal {...modalImage} onModalClose={setModalImage} />}
    </div>
  );
};
