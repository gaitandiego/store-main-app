import { IonButton, IonCard, IonCol } from '@ionic/react'
import React from 'react'
import { Category } from '../../interfaces/categoryInterface';
import './CategoryCardHome.css'

interface CategoryCardHomeProps {
    category: Category,
    onClick: (id: Category['id']) => void
}


const CategoryCardHome = ({ category, onClick }: CategoryCardHomeProps) => {
    const handleClick = (id: Category['id']) => onClick(id)
    return (
        <IonCol size="3" key={category.id} onClick={() => handleClick(category.id)}>
            <div className='category-card'>
                <img src={category.image} alt={category.name} />
                <p>{category.name}</p>
            </div>
        </IonCol>

    )
}

export default CategoryCardHome