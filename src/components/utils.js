
/**
 * 
 * @param {*} data data from axios call which loads ingredients
 * @returns options to be supported by react-select with only the ingregients
 */
export const getAvailableIngredients = (data) => {
  let options = []
  if(data && data.meals.length) {
    data.meals.map(ing => {
      if(ing.strIngredient) options.push(ing.strIngredient)
    })
  }
  return options
}

/**
 * 
 * @param {*} data data from axios call which loads category
 * @returns options to be supported by react-select with only the categories
 */
 export const getAvailableCategories = (data) => {
  let options = []
  if(data && data.categories.length) {
    data.categories.map(ing => {
      if(ing.strCategory) options.push(ing.strCategory)
    })
  }
  return options
}


