// import { useState } from "react";

// const status = Object.freeze({
//     idle: "idle",
//     loading: "loading",
//     error: "error",
//     isIdle:(v) => v === status.idle,
//     isLoading:(v) => v === status.loading,
//     isError:(v) => v === status.error,
// })

// const newState = status.idle;
// console.log(status.isError(newState));
// console.log(status.isIdle(newState));

// export const useMainState = () => {
//     const [ images, setImages ] = useState([]);
//     const [ loading, setLoading ] = useState(false);
//     const [ query, setQuery ] = useState('');
//     const [ page, setPage ] = useState(1);
//     const [ totalPages, setTotalPages ] = useState(1);
//     const [ modalImage, setModalImage ] = useState(null);
//     return [{images, loading, query, page, totalPages, modalImage},{images: setImages, loading: setLoading, query: setQuery, page: setPage, totalPages: setTotalPages, modalImage: setModalImage}]
// }

export const reducer = (p, action) => {
    switch (action.type) {
        case 'UPDATE':
            return {
              ...p,
                images: [...p.images, ...action.payload.images],
                totalPages: action.payload.totalPages,
                loading: false,
            }
        case 'SET_QUERY':
                return {
                ...p,
                    query: action.payload,
                    page: 1,
                    totalPages: 1,
                    images: [],
                    loading: true,
                    error: false,
                }
        case 'NEXT_PAGE':
            return {
              ...p,
                page: p.page + 1,
                loading: true,
                error: false,
            }
        case 'SET_TOTAL_PAGES':
            return {
              ...p,
                totalPages: action.payload
            }
        case 'SET_MODAL':
            return {
              ...p,
                modalImage: action.payload
            }
        case 'SET_ERROR':
            return {
             ...p,
                error: action.payload,
                loading: false,
            }
        default:
            throw Error('Unknown action: ' + action.type);
    }

}

export const initialArg = {
    images: [],
    loading: false,
    query: '',
    page: 1,
    totalPages: 1,
    modalImage: null,
    error: null,
}

