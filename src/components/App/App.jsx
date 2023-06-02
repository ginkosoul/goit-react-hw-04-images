import { Toaster, toast } from 'react-hot-toast';
import { reducer, initialArg } from './useMainState';

import { getImages } from 'services';
import { Button, ImageGallery, Loader, Searchbar, Modal } from 'components';
import { useEffect, useReducer } from 'react';

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialArg);
  const { images, loading, modalImage, page, totalPages, query, error } = state;

  const onSearch = payload => {
    if (payload !== query) dispatch({ type: 'SET_QUERY', payload });
    else toast.success('Already loaded. Try something different');
  };

  useEffect(() => {
    if (loading) {
      getImages(query, page)
        .then(payload => {
          dispatch({ type: 'UPDATE', payload });
        })
        .catch(payload => {
          dispatch({ type: 'SET_ERROR', payload });
        });
    }
  }, [loading, page, query]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: 'SET_ERROR', payload: null });
    }
  }, [error]);

  const setModalImage = payload => {
    dispatch({ type: 'SET_MODAL', payload });
  };

  const onLoadMoreClick = () => {
    dispatch({ type: 'NEXT_PAGE' });
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
