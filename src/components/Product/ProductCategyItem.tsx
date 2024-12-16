import React from 'react'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonicSlides } from '@ionic/react'
import { Product } from '../../interfaces/productsInterface'
import './ProductCategoryItem.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css/navigation';

interface ProductCategyItemProps {
    product: Product,
    onClick: (id: Product['id']) => void
}
const ProductCategyItem = ({ product, onClick }: ProductCategyItemProps) => {
    const handleOnClick = (id: Product['id']) => {
        onClick(id)
    }
    return (
        <div className='product-card'>
            <Swiper
                modules={[Navigation]}
                navigation={true}
                className="mySwiper"
            >
                {product.images.map((image) => (
                    <SwiperSlide key={image}>
                        <img src={image} alt={product.title} />
                    </SwiperSlide>
                ))}

            </Swiper>

            <p onClick={() => handleOnClick(product.id)}>{product.title}</p>
            <p onClick={() => handleOnClick(product.id)} className='product-price'>${product.price}</p>
        </div>
    )
}

export default ProductCategyItem