import { IonButton, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import './Favorites.css';
import * as TEXT from '../../utils/text';
import { useContext, useMemo, useState } from 'react';
import FavoritesContext from '../../context/favorites/FavoritesContext';
import { trash } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { Product } from '../../interfaces/productsInterface';
import * as ROUTES from '../../utils/routes';
import fallbackImage from '../../assets/images/fallback-image.png';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const [sortCriterion, setSortCriterion] = useState<'name' | 'date' | 'price'>('name');

  const history = useHistory();

  const handleSelectProduct = (id: Product['id']) => {
    history.push(`${ROUTES.ROUTES_PRODUCT}/${id}`);
  }
  const handleRemoveFavorite = (favorite: Product) => {
    removeFromFavorites(favorite);
  }

  const sortedFavorites = useMemo(() => {
    switch (sortCriterion) {
      case 'name':
        return [...favorites].sort((a, b) => a.title.localeCompare(b.title));
      case 'date':
        return [...favorites].sort((a, b) => new Date(b.dateAdd ?? 0).getTime() - new Date(a.dateAdd ?? 0).getTime());
      case 'price':
        return [...favorites].sort((a, b) => a.price - b.price);
      default:
        return favorites;
    }
  }, [favorites, sortCriterion]);

  return (
    <IonPage>
      <IonContent fullscreen className='favorites-container'>
        <IonHeader  >
          <IonToolbar className='header-container'>
            <IonTitle>{TEXT.TITLE_APP}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonHeader >
          <IonToolbar >
            <IonTitle size="large" className='title-favorites'>{TEXT.LIST_FAVORITES}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="sort-options-container">
          <IonSelect
            value={sortCriterion}
            onIonChange={(e) => setSortCriterion(e.detail.value)}
            placeholder="Sort by"
            label='Sort by'
          >
            <IonSelectOption value="name">Name</IonSelectOption>
            <IonSelectOption value="date">Added Date</IonSelectOption>
            <IonSelectOption value="price">Price</IonSelectOption>
          </IonSelect>
        </div>
        <IonList >
          {sortedFavorites.map((favorite) => (
            <IonItem key={favorite.id} >
              <img src={favorite.images[0]} className='favorites-container-image' onClick={() => handleSelectProduct(favorite.id)} onError={(e) => {
                e.currentTarget.src = fallbackImage;
                e.currentTarget.alt = "Image not available";
              }} />
              <IonLabel onClick={() => handleSelectProduct(favorite.id)} className='favorites-container-title'>{favorite.title}</IonLabel>
              <IonLabel slot='end' className='favorites-container-price'>${favorite.price}</IonLabel>
              <IonButton color='danger' fill='clear' slot='end' className='button-delete' onClick={() => handleRemoveFavorite(favorite)}>
                <IonIcon slot='icon-only' icon={trash} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
