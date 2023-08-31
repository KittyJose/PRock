import { useContext } from "react"
import { InitContext } from "../init"
import { InitContextProviderType, Props } from "../@types/Ingredients"
import Container from "react-bootstrap/Container"
import { FilterComponent } from "./FilterComponent"
import { ErrorMessage } from "./ErrorMessage"
import { MealListGrid } from "./MealListGrid"
import { RecipeCard } from "./RecepieCard"

export const Layout = () => {

  const { error } = useContext(InitContext) as InitContextProviderType

  return <Container className="my-5">
    <h2>A Recipe Generator</h2>
    {error && <ErrorMessage message={error}/>}
    <FilterComponent/>
    <RecipeCard/>
    <MealListGrid/>
  </Container>
}