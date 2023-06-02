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

// export class App extends Component {
//   state = {
//     images: [],
//     loading: false,
//     error: false,
//     query: '',
//     page: 1,
//     totalPages: 1,
//     modalImage: null,
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const { query, page, loading } = this.state;
//     if (!loading && (prevState.query !== query || prevState.page !== page)) {
//       this.setState({ loading: true, error: false });
//       getImages(query, page)
//         .then(({ images, totalPages }) => {
//           this.setState(ps => ({
//             images: [...ps.images, ...images],
//             loading: false,
//             totalPages,
//           }));
//         })
//         .catch(error => {
//           toast.error(error.message);
//           this.setState({ error, loading: false });
//         });
//     }
//   }
//   onSearch = query => {
//     if (query !== this.state.query)
//       this.setState({ query, images: [], page: 1 });
//     else toast.success('Already loaded. Try something different');
//   };
//   onImageClick = modalImage => {
//     this.setState({ modalImage });
//   };
//   onLoadMoreClick = () => {
//     this.setState(ps => ({ page: ps.page + 1 }));
//   };
//   onModalClose = () => {
//     this.setState({ modalImage: null });
//   };

//   render() {
//     const { images, loading, modalImage, page, totalPages } = this.state;
//     const isGallery = images.length > 0;
//     const isButton = page < totalPages;
//     return (
//       <div className="App">
//         <Searchbar onSearch={this.onSearch} disable={loading} />
//         <Toaster position="top-right" reverseOrder={false} />
//         {isGallery && (
//           <ImageGallery images={images} onImageClick={this.onImageClick} />
//         )}
//         {loading ? (
//           <Loader />
//         ) : (
//           isButton && <Button onClick={this.onLoadMoreClick} />
//         )}
//         {modalImage && (
//           <Modal {...modalImage} onModalClose={this.onModalClose} />
//         )}
//       </div>
//     );
//   }
// }
