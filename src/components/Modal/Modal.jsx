import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Modal({ onModalClose, largeImageURL, tags }) {
  useEffect(() => {
    const closeModalOnEsc = e => {
      if (e.code === 'Escape') {
        onModalClose(null);
      }
    };
    window.addEventListener('keydown', closeModalOnEsc);
    return () => {
      window.removeEventListener('keydown', closeModalOnEsc);
    };
  }, [onModalClose]);

  const onBackDropClick = e =>
    e.target === e.currentTarget && onModalClose(null);

  return (
    <div onClick={onBackDropClick} className="Overlay">
      <div className="Modal">
        <img className="ModalImage" src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onModalClose: PropTypes.func.isRequired,
};
