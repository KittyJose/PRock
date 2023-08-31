import React, { createContext, useState, useEffect } from "react"
import axios from 'axios';
import { ENDPOINTS } from "./components/constants"
import { getAvailableIngredients, getAvailableCategories } from "./components/utils"
import { Props, MealList, InitContextProviderType, Recipe } from "./@types/Ingredients"

// define context 
export const InitContext = createContext<InitContextProviderType | null>(null)

// define context provider 
export const InitProvider: React.FC <Props> = ({ children }) => {

  // constants to set ingredients list
  const [ingredients, setIngredients] = useState<string[]>([])
  // constants to look up for ingredient recepies 
  const [lookUpIngredient, setLookUpIngredient] = useState<string>("")

  // constants to set meal type list
  const [mealType, setMealType] = useState<string[]>([])
  // constants to look up for meal type recepies 
  const [lookUpMealType, setLookUpMealType] = useState<string>("")

  // constants to set search results of meals from selected ingredient
  const [mealList, setMealList] = useState<MealList[]>([])
  // constants to set chosen recipe ID
  const [selectedRecipeID, setSelectedRecipeID] = useState<number| null>(null)
  // constant to get recipe
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>({})

  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // on load
  useEffect(() => {
    async function getFilterList () {
      setLoading(true)
      Promise.all(ENDPOINTS.map((endpoint) => 
        axios.get(endpoint)))
        .then(([{data: meals}, {data: categories}] )=> {
          
          setIngredients(getAvailableIngredients(meals))
          setMealType(getAvailableCategories(categories))
        })
        .catch((err) => setError(`Error in fetching ingredients - ${err}`))
        .finally(() => setLoading(false));
    }
    getFilterList()
  }, [])

  // look up by ingredients 
  useEffect(() => {
    async function lookup () {
      setLoading(true)
      await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?i=${lookUpIngredient}`)
        .then((res) => {
          cleanUp()
          setMealList(res.data.meals)
          setLookUpMealType("")
        })
        .catch((err) => setError(`Error in fetching recipies for ${lookUpIngredient} - ${err}`))
    }
    if(lookUpIngredient) lookup()
  }, [lookUpIngredient])

  // look up by category 
  useEffect(() => {
    async function lookup () {
      setLoading(true)
      await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${lookUpMealType}`)
        .then((res) => {
          cleanUp() 
          setMealList(res.data.meals)
          setLookUpIngredient("")
        })
        .catch((err) => setError(`Error in fetching recipies for ${lookUpMealType} - ${err}`))
    }
    if(lookUpMealType) lookup()
  }, [lookUpMealType])

  useEffect(() => {
    async function getSelectedRecipeByID () {
      setLoading(true)
      await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedRecipeID}`)
        .then((res) => {
          setSelectedRecipe(res.data.meals[0])
          setLoading(false)
        })
        .catch((err) => setError(`Error in fetching recipies for ${selectedRecipeID} - ${err}`))
    }
    if(selectedRecipeID) getSelectedRecipeByID()
  }, [selectedRecipeID])

  function cleanUp() {
    setSelectedRecipe({})
    setLoading(false)
  }


  return <InitContext.Provider value={{
    ingredients,
    error, 
    setError,
    isLoading,
    lookUpIngredient, 
    setLookUpIngredient,
    mealList,
    setSelectedRecipeID,
    selectedRecipe,
    mealType,
    lookUpMealType, 
    setLookUpMealType
  }}>
    {children}
  </InitContext.Provider>
}