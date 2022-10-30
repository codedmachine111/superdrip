const CATEGORIES_ACTION_TYPES={
    SET_CATEGORIES: "SET_CATEGORIES",
  }
  const CATEGORIES_INITIAL_STATE = {
    categoriesMap: {},
  }
  const categoriesReducer=(state=CATEGORIES_INITIAL_STATE,action={})=>{
    const {type, payload} = action;
    switch(type){
      case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
        return {
          ...state,
          categoriesMap: payload,
        }
      default:
        throw new Error(`Unhandled action type: ${type}`);
    }
  }