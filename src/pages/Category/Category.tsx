import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react'
import { useHistory, useParams } from 'react-router'
import { API_URL_CATEGORIES, API_URL_PRODUCTS } from '../../utils/api'
import { Category as CategoryInterface } from '../../interfaces/categoryInterface'
import { useState } from 'react'
import { Product } from '../../interfaces/productsInterface'
import ProductCategyItem from '../../components/Product/ProductCategyItem'
import * as ROUTES from '../../utils/routes'
import * as TEXT from '../../utils/text'
import { arrowBackOutline, menuOutline, searchOutline } from 'ionicons/icons'

type UseParamsType = {
    id: string
}

const Category = () => {
    const params = useParams<UseParamsType>()
    const [category, setCategory] = useState<CategoryInterface>();
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    const [hideSearch, setHideSearch] = useState(false)

    useIonViewDidEnter(() => {
        const fecthCategory = async () => {
            try {
                const response = await fetch(`${API_URL_CATEGORIES}/${params?.id}`);
                const data = await response.json();
                if (response.status === 200) {
                    setCategory(data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fecthCategory()

        const fecthProducts = async () => {
            try {
                const response = await fetch(`${API_URL_CATEGORIES}/${params?.id}/products`);
                const data = await response.json();
                if (response.status === 200) {
                    setProducts(data)
                }

            } catch (error) {
                console.log(error)

            } finally {
                setLoading(false)
            }
        }
        fecthProducts()

    });
    const handleClickProduct = (id: Product['id']) => {
        history.push(`${ROUTES.ROUTES_PRODUCT}/${id}`)
    }

    const handleSearch = () => {
        setHideSearch(!hideSearch)
    }
    const handleBack = () => {
        history.goBack()
    }

    const handleChangeSearch = async (ev: Event) => {
        try {
            const value = (ev.target as HTMLInputElement).value
            const response = await fetch(`${API_URL_PRODUCTS}/?title=${value}&categoryId=${params?.id}`);
            const data = await response.json();
            setProducts(data)

        } catch (error) {
            console.log(error)
        }
    }
    return (

        <IonPage>
            <IonContent fullscreen>
                <IonHeader  >
                    <IonToolbar className='header-container'>
                        <IonIcon slot="start" size='large' icon={arrowBackOutline} onClick={handleBack} />
                        <IonTitle>{category?.name}</IonTitle>
                        <IonIcon slot="end" size='large' icon={searchOutline} onClick={handleSearch} />
                    </IonToolbar>
                    {hideSearch && (<IonToolbar className='header-container'>
                        <IonSearchbar showClearButton="focus" color="light" onIonInput={(ev) => handleChangeSearch(ev)}></IonSearchbar>
                    </IonToolbar>)}
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        {products?.map((product) => (
                            <IonCol size="4" key={product.id}>
                                <ProductCategyItem key={product.id} product={product} onClick={(id) => handleClickProduct(id)} />
                            </IonCol>
                        ))}
                        {loading ? (<IonCol>
                            <h5>{TEXT.LOADING}</h5>
                        </IonCol>)
                            : !loading && products.length === 0 ? (
                                <IonCol>
                                    <h5>{TEXT.NOT_PRODUCTS}</h5>
                                </IonCol>
                            ) : null}

                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    )
}

export default Category