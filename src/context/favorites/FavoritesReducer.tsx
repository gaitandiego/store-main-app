import { Product } from '../../interfaces/productsInterface';

export interface Action {
    type: Types;
    payload?: Product;
}


export enum Types {
    ADD_TO_FAVORITES = 'ADD_TO_FAVORITES',
    REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES',
    CLEAR_FAVORITES = 'CLEAR_FAVORITES',
}
const Storage = (favoriteItems: Product[]) => {
    localStorage.setItem('favorites', JSON.stringify(favoriteItems.length > 0 ? favoriteItems : []));
}

const FavoritesReducer = (state: Product[], action: Action): Product[] => {
    switch (action.type) {
        case Types.ADD_TO_FAVORITES:
            if (action.payload) {
                const product = action.payload;
                const exist = state.find((item) => item.id === product.id);
                if (exist) {
                    return state;
                }
                const newFavorites = [...state, { ...product, dateAdd: new Date() }];
                Storage(newFavorites);
                return newFavorites;
            }
            return state;
        case Types.REMOVE_FROM_FAVORITES:
            if (action.payload) {
                const product = action.payload;
                const newFavoritesRemove = state.filter((item) => item.id !== product.id);
                Storage(newFavoritesRemove);
                return newFavoritesRemove;
            }
            return state;
        case Types.CLEAR_FAVORITES:
            Storage([]);
            return [];
        default:
            return state;
    }
}

export default FavoritesReducer;