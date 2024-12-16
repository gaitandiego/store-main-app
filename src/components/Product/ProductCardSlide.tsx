import React from 'react'
import { Product } from '../../interfaces/productsInterface'
import { IonCard, IonImg } from '@ionic/react'
import './ProductCardSlide.css'
import fallbackImage from '../../assets/images/fallback-image.png'

interface ProductCardSlideProps {
    product: Product
}
const ProductCardSlide = ({ product }: ProductCardSlideProps) => {
    return (
        <IonCard className='card-container'>
            <img className="card-image" src={product.images[0]} alt={product.title} onError={(e) => {
                e.currentTarget.src = fallbackImage;
                e.currentTarget.alt = "Image not available";
            }} />
            <div className="price-tag">
                ${product.price}
            </div>
            <div className="card-description">
                <p>{product.title}</p>
            </div>
        </IonCard>
    )
}

export default ProductCardSlide