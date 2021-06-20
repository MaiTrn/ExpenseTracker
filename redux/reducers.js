import { CATEGORIES_STATE_CHANGE, EXPENSES_STATE_CHANGE } from "./constants";

const initialState = {
  categoriesData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_STATE_CHANGE:
      return {
        ...state,
        categoriesData: action.categoriesData,
      };
    case EXPENSES_STATE_CHANGE:
      return {
        ...state,
        categoriesData: state.categoriesData.map((category) =>
          category.id == action.categoryID
            ? { ...category, expenses: action.expenses }
            : category
        ),
      };
    default:
      return state;
  }
};

export default reducer;
