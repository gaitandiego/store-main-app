import { ReactNode, useReducer } from "react";
import FavoritesReducer, { Types } from "./FavoritesReducer";
import { Product } from "../../interfaces/productsInterface";
import FavoritesContext from "./FavoritesContext";

const storageFavorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : [];

const FavoritesState = ({ children }: { children: ReactNode }) => {
    const initialState = storageFavorites;

    const [state, dispatch] = useReducer(FavoritesReducer, initialState);

    const addToFavorites = (payload: Product) => {
        dispatch({ type: Types.ADD_TO_FAVORITES, payload: payload });
    }

    const removeFromFavorites = (payload: Product) => {
        dispatch({ type: Types.REMOVE_FROM_FAVORITES, payload: payload });
    }

    const clearFavorites = () => {
        dispatch({ type: Types.CLEAR_FAVORITES });
    }
    return (
        <FavoritesContext.Provider value={{ favorites: state, addToFavorites, removeFromFavorites, clearFavorites }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesState;
