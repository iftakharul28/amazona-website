import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  card: {
    cardItems: Cookies.get('cardItems')
      ? JSON.parse(Cookies.get('cardItems'))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    case 'CARD_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.card.cardItems.find(
        (item) => item._id === newItem._id
      );
      const cardItems = existItem
        ? state.card.cardItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.card.cardItems, newItem];
      Cookies.set('cardItems', JSON.stringify(cardItems));
      return { ...state, card: { ...state.card, cardItems } };
    }
    case 'CARD_REMOVE_ITEM': {
      const cardItems = state.card.cardItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set('cardItems', JSON.stringify(cardItems));
      return { ...state, card: { ...state.card, cardItems } };
    }
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
