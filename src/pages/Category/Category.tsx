import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react'
import * as TEXT from '../../utils/text'
import { useParams } from 'react-router'

const Category = () => {
    const params = useParams()

    useIonViewDidEnter(() => {
        console.log('ionViewDidEnter event fired');
    });


    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader collapse="condense" >
                    <IonToolbar className='header-container'>
                        <IonTitle>{TEXT.TITLE_CATEGORY}</IonTitle>
                    </IonToolbar>
                </IonHeader>

            </IonContent>
        </IonPage>
    )
}

export default Category