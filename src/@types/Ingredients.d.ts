export interface Props {
  children: React.ReactElement
}


export interface Ingredients {
  id: number
  name: string
}

export interface MealList {
  idMeal: number
  strMeal: string
  strMealThumb: string
}

type Recipe = {
  [key: string]: string
}

export interface IngredientThumbNail {
  ingredient: string
}

export interface InitContextProviderType {
  ingredients: string[]
  lookUpIngredient: string 
  setLookUpIngredient: (lookUpIngredient: string) => void
  error: string | null
  setError: (error: string | null) => void
  isLoading: boolean
  mealList: MealList[]
  setSelectedRecipeID: (idMeal: number) => void
  selectedRecipe: Recipe
  mealType: string[]
  lookUpMealType: string 
  setLookUpMealType: (lookUpMealType: string) => void
}

