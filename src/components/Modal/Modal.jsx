import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Modal({ onModalClose, largeImageURL, tags }) {
  const closeModalOnEsc = e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModalOnEsc);
    return () => {
      window.removeEventListener('keydown', closeModalOnEsc);
    };
  });

  return (
    <div onClick={() => onModalClose(null)} className="Overlay">
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onModalClose: PropTypes.func.isRequired,
};
