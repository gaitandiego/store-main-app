import { createContext } from "react";
import { Product } from "../../interfaces/productsInterface";

const FavoritesContext = createContext({
    favorites: [] as Product[],
    addToFavorites: (payload: any) => { },
    removeFromFavorites: (payload: any) => { },
    clearFavorites: () => { }
});
export default FavoritesContext;