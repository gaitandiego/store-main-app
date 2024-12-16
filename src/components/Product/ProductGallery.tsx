import React from 'react'
import { Product } from '../../interfaces/productsInterface'
import { IonCard, IonImg } from '@ionic/react'
import './ProductGallery.css'

interface ProductGalleryProps {
    image: string
}

const ProductGallery = ({ image }: ProductGalleryProps) => {
    return (
        <IonCard className='card-product-container'>
            <IonImg className="card-product-image" src={image} />
        </IonCard>
    )
}

export default ProductGallery