import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { InitContext } from "../init"
import { Loading } from "./Loading"
import { InitContextProviderType, MealList } from "../@types/Ingredients"

const CardHolder = () => {
  const { mealList, setSelectedRecipeID } = useContext(InitContext) as InitContextProviderType

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    if(setSelectedRecipeID) setSelectedRecipeID(id)
  }

  return <Row xs={1} md={4} className="g-4">
    {mealList.map((meal: MealList) => {
      return <Col key={`col__${meal.idMeal}`}>
        <Card key={`card__${meal.idMeal}`} 
          bg="light"
          className="meal__list__card"
          onClick={(e) => handleClick(e, meal.idMeal)}>
          <Card.Body>
            <Card.Title>{meal.strMeal}</Card.Title>
          </Card.Body>
          <Card.Img variant="bottom" src={meal.strMealThumb} />
        </Card>
      </Col>
    })}
  </Row>
}

export const MealListGrid = () => {

  const { mealList, lookUpIngredient, lookUpMealType, isLoading } = useContext(InitContext) as InitContextProviderType

  if(isLoading) return <Loading/>
  if(!mealList.length) return <div/>

  return <div className='my-5'>
    <h5>{`Search results for ${lookUpIngredient ? `Ingredient ${lookUpIngredient}` : `Meal Category ${lookUpMealType}`}`}</h5>
    <CardGroup>
      <CardHolder/>
    </CardGroup>
  </div>
} 