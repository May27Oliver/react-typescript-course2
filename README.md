# Typescript React 課程

## Redux

Actions(dispatch) => Reducer(state)=> Store => React UI(subscribe)

## React-redux

connect
provider
mapStateToProps
mapDispatchToProps

mapStateToProps 及 mapDispatchToProps。 mapStateToProps 將 Redux Store 內的 counter，對照到 Component 的 props 之中， 而 mapDispatchToProps 則將兩個動作：INCREMENT、DECREMENT 對照到 props 的函數，兩個都是以 map 開頭，正正是為了對照兩大重點：state(狀態)與 dispatch(分配動作)，狀態與分配動作是 Redux 兩個不可或缺的部份。 而更重要的是，需要用到特殊函數 connect 才能使我們的部件正常連接到 Redux，讀取 Redux Store 裏面的狀態。

Redux hooks
https://ithelp.ithome.com.tw/articles/10251966

useSelector
useDispatch
useContext
useReducer

middleware:用來處理 side effect 如 api 請求。

Redux-thunk:思路是將獲取 API 的邏輯放入 redux-store 中，避免在每個頁面都呼叫一次 API，節省 api 獲取次數。

middlewar: middleware 的概念就是 functional programing 中的複合函式與 curry 化的集合體，透過函式的合併來完成對 action 的處理。

```javascript=
const middleware = (store)=>(next)=>(action)=>{ }
```
