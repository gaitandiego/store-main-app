import { IonCard, IonCol, IonContent, IonGrid, IonHeader, IonicSlides, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Home.css';
import { Product } from '../../interfaces/productsInterface';
import { useState } from 'react';
import { API_URL_CATEGORIES, API_URL_CATEGORIES_LIMIT, API_URL_PRUDUCTS_LIMIT } from '../../utils/api';
import { Category } from '../../interfaces/categoryInterface';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import 'swiper/css/effect-fade';
import '@ionic/react/css/ionic-swiper.css';

import ProductCardSlide from '../../components/Product/ProductCardSlide';
import * as TEXT from '../../utils/text';
import * as ROUTES from '../../utils/routes';
import CategoryCardHome from '../../components/Category/CategoryCardHome';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react';
const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const history = useHistory();
  const [present] = useIonToast();

  useIonViewDidEnter(() => {
    const fecthProducts = async () => {
      try {
        const response = await fetch(API_URL_PRUDUCTS_LIMIT);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error)
        present({
          message: TEXT.ERROR_FETCHING_DATA,
          duration: 4500,
          position: 'top',
        });
      }
    }
    fecthProducts();

    const fecthCategories = async () => {
      try {
        const response = await fetch(API_URL_CATEGORIES_LIMIT);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error)
        present({
          message: TEXT.ERROR_FETCHING_DATA,
          duration: 4500,
          position: 'top',
        });
      }

    }
    fecthCategories();
  });

  const handleClickCategory = (id: Category['id']) => {
    history.push(`${ROUTES.ROUTES_CATEGORY}/${id}`)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense" >
          <IonToolbar className='header-container'>
            <IonTitle>{TEXT.TITLE_APP}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Swiper
          modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFade, IonicSlides]}
          autoplay={true}
          keyboard={true}
          pagination={true}
          scrollbar={true}
          zoom={true}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCardSlide product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <IonHeader collapse="condense">
          <IonToolbar >
            <IonTitle size="large" className='title-home'>{TEXT.CATEGORIES}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {categories.map((category) => (
              <CategoryCardHome category={category} key={category.id} onClick={handleClickCategory} />
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
