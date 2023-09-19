import React, { useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'
import Card from '../UI/Card';


export default function AvailableMeals() {

  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeal = async ()=>{
     const response = await fetch('https://food-order-webapp-default-rtdb.asia-southeast1.firebasedatabase.app/meal.json')
     if (!response.ok) {
        throw new Error("Something Went Wrong!");
     }
     const responseData = await response.json();
     const loadedMeal = []
     for( const key in responseData ){
        loadedMeal.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        })
     }
     setMeals(loadedMeal)
     setIsLoading(false)
    };
     fetchMeal().catch((error) =>{
     setIsLoading(false)
     setHttpError(error.message)
     })
    
  }, [])

  if (isLoading) {
    return(
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }
if (httpError) {
  return(
    <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  )
}
    const mealList = meals.map((meal) => (
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
