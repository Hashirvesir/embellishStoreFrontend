import { createSlice } from '@reduxjs/toolkit'

export const cartslice = createSlice({
  name: 'cart',
  initialState: {
    cartItem:[], 
    
  },
  reducers: {
    addtoCart: (state,action)=>{
        const existingItem = state.cartItem.find((p) => p.id === action.payload.id);
        if (existingItem) {
          state.cartItem = state.cartItem.map((item) =>
            item.id === existingItem.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  attributes: {
                    ...item.attributes,
                    price: item.oneQuantityPrice * (item.quantity + 1),
                  },
                }
              : item
          );
        } else {
          state.cartItem.push({ ...action.payload, quantity: 1 });
        }
      },
      
    updateCart:(state,action)=>{
          state.cartItem = state.cartItem.map((p)=>{
            if(p.id === action.payload.id) {
                if (action.payload.key === "quantity") {
                      p.attributes.price = p.oneQuantityPrice * action.payload.val

                    }
                    return {...p,[action.payload.key]:action.payload.val}
          }
          return p
          })
    },
    removeFromCart:(state,action)=>{
      state.cartItem = state.cartItem.filter((p)=> p.id !== action.payload.id)

    },
    clearCart: (state) => {
      state.cartItem = [];
    },
  }
})

// Action creators are generated for each case reducer function
export const {  addtoCart,updateCart,removeFromCart,clearCart} = cartslice.actions

export default cartslice.reducer