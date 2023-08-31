import React, { useContext } from "react"
import { InitContext } from "../init"
import { InitContextProviderType } from "../@types/Ingredients"
import { SelectComponent } from "./Select"
import { Loading } from "./Loading"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

export const FilterComponent = () => {

  const { 
    mealType,
    ingredients, 
    isLoading,
    setLookUpIngredient,
    setLookUpMealType
  } = useContext(InitContext) as InitContextProviderType

  if(isLoading) return <Loading/>

  return <Card className="my-5" bg="light">
    <Card.Body>
      <Row className="w-100">
        <Col md={6}>
          <SelectComponent options={ingredients}  
            name={"ingredient"}
            onChange={setLookUpIngredient}
          />
        </Col>
        <Col md={6}>
        <SelectComponent options={mealType}  
            name={"meal category"}
            onChange={setLookUpMealType}
          />
        </Col>
      </Row>
    </Card.Body>
  </Card>
    
}