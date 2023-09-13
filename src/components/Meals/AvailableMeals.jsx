import React from 'react'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'
import Card from '../UI/Card';

const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Kadai Paneer',
      description: 'Cottage Chesse with Tomato Curry',
      price: 200,
    },
    {
      id: 'm2',
      name: 'Mix Veg',
      description: 'Mix Vegitable with Tomato Curry',
      price: 180,
    },
    {
      id: 'm3',
      name: 'Daal Makhni',
      description: 'lentals with Butter',
      price: 190,
    },
    {
      id: 'm4',
      name: 'White Rice',
      description: 'Plain White Rice',
      price: 110,
    },
  ];

export default function AvailableMeals() {
    const mealList = DUMMY_MEALS.map((meal) => (
    <MealItem 
      key={meal.id} 
      id={meal.id}
      name={meal.name} 
      description={meal.description} 
      price={meal.price} 
    />))
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
            {mealList}
        </ul>
      </Card>
    </section>
  )
}
