const initialState = {
   users: []
};

const ItemReducer = (state = initialState, action) => {
   switch (action.type) {
      case "GET_USERS":
         return {
            ...state,
            users: action.payload
         }
      default:
         return state
   }
};

export default ItemReducer;