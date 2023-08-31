import React, { useContext } from 'react';
import { InitContext } from "../init"
import { Loading } from "./Loading"
import { InitContextProviderType, Recipe, IngredientThumbNail } from "../@types/Ingredients"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { INGREDIENT_TAG, MEASURE_TAG } from "./constants"

function getMeasurement (selectedRecipe: Recipe, index: number) {
  return selectedRecipe[`${MEASURE_TAG}${index}`]
}

const IngredientThumbNailImg: React.FC <IngredientThumbNail>  = ({ ingredient }) => {
  return <img src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
    alt={ingredient}
    height="20px"
    width="20px"/>
}

const DisplayIngredients = () => {
  const { selectedRecipe } = useContext(InitContext) as InitContextProviderType
  let ingredientList = [], index = 0
  for(let key in selectedRecipe) {
    if(key.includes(INGREDIENT_TAG) && selectedRecipe[key]) {
      let ingredient = selectedRecipe[key]
      index+=1
      ingredientList.push(
        <ListGroup.Item key={`list__item__${selectedRecipe[key]}`} className="d-flex w-100">
          <IngredientThumbNailImg ingredient={ingredient}/>
          <h6 className="mr-3">{`${ingredient} - ${getMeasurement(selectedRecipe, index)}`}</h6>
        </ListGroup.Item>
      )
    }
  }

  return <>
    <h5>Ingredients</h5>
    <ListGroup>{ingredientList}</ListGroup>
  </>

}

export const RecipeCard = () => {

  const { selectedRecipe, isLoading } = useContext(InitContext) as InitContextProviderType

  if(isLoading) return <Loading/>
  if(!Object.entries(selectedRecipe).length) return <div/>

  //console.log("selectedRecipe", selectedRecipe)

  return <Card className='w-100 my-5'>
    <Card.Header className='text-primary h4'>{`${selectedRecipe.idMeal} - ${selectedRecipe.strMeal}`}</Card.Header>
    <Card.Body>
      <Row>
        <Col md={4}>
          <Card.Img src={selectedRecipe.strMealThumb}/>
          {selectedRecipe.strYoutube && <Button href={selectedRecipe.strYoutube} target="_blank"  variant="link">Click here to view video</Button>}
        </Col>
        <Col md={8}>
          <Badge>{selectedRecipe.strArea}</Badge>
          <h5>Instructions</h5>
          <p>{selectedRecipe.strInstructions}</p>
          <DisplayIngredients/>
        </Col>
      </Row>
      
    </Card.Body>
  </Card>
}