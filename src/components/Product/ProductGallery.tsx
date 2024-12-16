import { IonCard, IonImg } from '@ionic/react'
import './ProductGallery.css'
import fallbackImage from '../../assets/images/fallback-image.png'

interface ProductGalleryProps {
    image: string
}

const ProductGallery = ({ image }: ProductGalleryProps) => {
    return (
        <IonCard className='card-product-container'>
            <img className="card-product-image" src={image} onError={(e) => {
                e.currentTarget.src = fallbackImage;
                e.currentTarget.alt = "Image not available";
            }} />
        </IonCard>
    )
}

export default ProductGallery