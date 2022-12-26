
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {createProductToStoreApi, updateProductToStoreApi} from './productetService'


const initialState = {
  products:[],
  addProduct: {},
  isLoading:false,
  isSuccess:false,
  isError:false,
  message:'',
  updateProduct:{}
};


export const createProduct = createAsyncThunk('product/uploadProduct', async (product,thunkAPI)=>{
  try {
    product.price = +product.price
    product.priority = +product.priority
    product.units = +product.units
    product.productStock = +product.productStock
    const data = createProductToStoreApi(product)
    return data
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString()
  return thunkAPI.rejectWithValue(message)
  }
})
export const updateProductSlice = createAsyncThunk('product/updateProduct', async (product,thunkAPI)=>{
  try {
    product.price = +product.price
    product.priority = +product.priority
    product.units = +product.units
    product.productStock = +product.productStock
    console.log(product);
    
    const data = updateProductToStoreApi(product, product._id)
    return data
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString()
  return thunkAPI.rejectWithValue(message)
  }
})



const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state = initialState;
    },
    settingProduct: (state, action) => {
      state.addProduct = (action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.addProduct = (action.payload);
        console.log(action);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateProductSlice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProductSlice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products.push(action.payload)
      })
      .addCase(updateProductSlice.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        console.log(action);
      })

  }
});

export const { clearProduct, settingProduct } = productSlice.actions;

export default productSlice.reducer;
