import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'
import axios from 'axios'

export const FETCH_RECOMMENDED_PRODUCTS_START = 'FETCH_RECOMMENDED_PRODUCTS_START'
export const FETCH_RECOMMENDED_PRODUCTS_SUCCESS = 'FETCH_RECOMMENDED_PRODUCTS_SUCCESS'
export const FETCH_RECOMMENDED_PRODUCTS_FAIL = 'FETCH_RECOMMENDED_PRODUCTS_FAIL'

export interface RecommendProductsState {
    productList: ProductListType[]
    loading: boolean
    error: string | null
}

export interface ProductListType {
    description: string
    id: number
    title: string
    touristRoutes: touristRoutesType[]
}

export interface touristRoutesType {
    createTime: string
    departureCity: string
    description: string
    discountPresent: number
    id: string
    originalPrice: number
    price: number
    rating: number
    title: string
    travelDays: string
    tripType: string
    updateTime: string | null
    touristRoutePictures: touristRoutePicturesType[]
}

export interface touristRoutePicturesType {
    id: number
    touristRouteId: string
    url: string
}

export interface FetchRecommendedProductStartAction {
    type: typeof FETCH_RECOMMENDED_PRODUCTS_START
}

export interface FetchRecommendedProductSuccessAction {
    type: typeof FETCH_RECOMMENDED_PRODUCTS_SUCCESS
    payload: ProductListType[]
}

export interface FetchRecommendedProductFailAction {
    type: typeof FETCH_RECOMMENDED_PRODUCTS_FAIL
    payload: string | null
}
export type GetProductListAction = ThunkAction<void, RootState, unknown, RecommendProductListActionTypes>

export type RecommendProductListActionTypes =
    | FetchRecommendedProductFailAction
    | FetchRecommendedProductSuccessAction
    | FetchRecommendedProductStartAction
    
export const fetchRecommendProductStartActionCreator = (): FetchRecommendedProductStartAction => {
    return {
        type: FETCH_RECOMMENDED_PRODUCTS_START,
    }
}

export const fetchRecommendProductSuccessActionCreator = (
    productList: ProductListType[]
): FetchRecommendedProductSuccessAction => {
    return {
        type: FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
        payload: productList,
    }
}

export const fetchRecommendProductFailActionCreator = (error: string): FetchRecommendedProductFailAction => {
    return {
        type: FETCH_RECOMMENDED_PRODUCTS_FAIL,
        payload: error,
    }
}

export const getProductListActionCreator =
    (): GetProductListAction => async (dispatch, getState) => {
        dispatch(fetchRecommendProductStartActionCreator())
        try {
            const { data } = await axios.get('http://123.56.149.216:8080/api/productCollections')
            dispatch(fetchRecommendProductSuccessActionCreator(data))
        } catch (e) {
            dispatch(fetchRecommendProductFailActionCreator(e))
        }
    }
