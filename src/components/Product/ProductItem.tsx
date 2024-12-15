import React from 'react'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import { Product } from '../interfaces/productsInterface'

interface ProductItemProps {
    product: Product
}
const ProductItem = ({ product }: ProductItemProps) => {
    console.log(product)
    return (
        <IonCard>
            <img src={product.images[0]} alt={product.title} />
            <IonCardHeader>
                <IonCardTitle>{product.title}</IonCardTitle>
                <IonCardSubtitle>{product.price}</IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    )
}

export default ProductItem