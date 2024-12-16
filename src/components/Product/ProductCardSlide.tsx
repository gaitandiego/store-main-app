import React from 'react'
import { Product } from '../../interfaces/productsInterface'
import { IonCard, IonImg } from '@ionic/react'
import './ProductCardSlide.css'

interface ProductCardSlideProps {
    product: Product
}
const ProductCardSlide = ({ product }: ProductCardSlideProps) => {
    return (
        <IonCard className='card-container'>
            <IonImg className="card-image" src={product.images[0]} alt={product.title} />
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