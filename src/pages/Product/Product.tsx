import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { useContext, useState } from 'react';
import { arrowBackOutline, heart, menuOutline, searchOutline } from 'ionicons/icons';
import { Product } from '../../interfaces/productsInterface';
import { API_URL_PRODUCTS } from '../../utils/api';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import * as TEXT from '../../utils/text';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import '@ionic/react/css/ionic-swiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductGallery from '../../components/Product/ProductGallery';
import FavoritesContext from '../../context/favorites/FavoritesContext';

const ProductPage = () => {
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext)
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [product, setProduct] = useState<Product>();
    const { id } = useParams<{ id: string }>();

    const handleBack = () => {
        history.goBack();
    };

    useIonViewDidEnter(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL_PRODUCTS}/${id}`);
                const data = await response.json();
                if (response.status === 200) {
                    setProduct(data);
                }
            } catch (error) {
                console.log(error);
                console.log('error');
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    });

    const isFavorite = favorites.some((favorite) => favorite.id === product?.id);

    const handleAddFavorites = () => isFavorite ? removeFromFavorites(product) : addToFavorites(product);

    return (
        <IonPage className='product-page'>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar className='header-container'>
                        <IonIcon slot="start" size='large' icon={arrowBackOutline} onClick={handleBack} />
                        <IonTitle>{product?.title}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                {loading ? (
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <h5>{TEXT.LOADING}</h5>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                )
                    : !product ? (
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <h5>{TEXT.NOT_PRODUCTS}</h5>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    ) : (
                        <>
                            <Swiper
                                modules={[Autoplay, EffectFade, Navigation]}
                                autoplay={true}
                                navigation
                                className="product-gallery"
                            >
                                {product?.images?.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductGallery image={image} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='8'>
                                        <h2>{product?.title}</h2>
                                        <h3>${product?.price}</h3>

                                    </IonCol>
                                    <IonCol>
                                        <IonButton onClick={handleAddFavorites} shape="round" className={`${isFavorite ? "button-icon-favorite-active" : "button-icon-favorite"}`} >
                                            <div className="icon-border">
                                                <IonIcon slot="icon-only" icon={heart}></IonIcon>
                                            </div>

                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <h5>{TEXT.DESCRIPTION}</h5>
                                        <IonLabel>{product?.description}</IonLabel>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </>
                    )}

            </IonContent>
        </IonPage >
    );
};

export default ProductPage;