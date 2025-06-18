const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.product.id
      );

      if (existingProduct) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.product.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      } else {
        return {
          ...state,
          products: [
            ...state.products,
            { ...action.payload.product, quantity: 1 },
          ],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        products: state.products
          .map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
          .filter((product) => product.quantity > 0),
      };
    case "CLEAR_CART":
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
