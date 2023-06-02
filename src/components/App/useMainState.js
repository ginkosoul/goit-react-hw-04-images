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

