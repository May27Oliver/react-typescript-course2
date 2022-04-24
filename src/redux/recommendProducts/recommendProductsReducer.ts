import { RecommendProductsState } from './recommendProductsActions'
import {
    FETCH_RECOMMENDED_PRODUCTS_START,
    FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
    FETCH_RECOMMENDED_PRODUCTS_FAIL,
    RecommendProductListActionTypes,
} from './recommendProductsActions'
const defaultState: RecommendProductsState = {
    productList: [],
    loading: true,
    error: null,
}

const recommendProductsReducer = (state = defaultState, action: RecommendProductListActionTypes) => {
    switch (action.type) {
        case FETCH_RECOMMENDED_PRODUCTS_START:
            return {
                ...state,
                loading: true,
            }
        case FETCH_RECOMMENDED_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading:false,
                productList: action.payload,
            }
        case FETCH_RECOMMENDED_PRODUCTS_FAIL:
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        default:
            return state
    }
}
export default recommendProductsReducer
