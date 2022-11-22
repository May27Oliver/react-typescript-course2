/** A function that accepts a potential "extra argument" value to be injected later,
 * and returns an instance of the thunk middleware that uses that value
 */
const createThunkMiddleware: (_ref: any) => (next: any) => (action: any) => any = (extraArgument) => {
    // Standard Redux middleware definition pattern:
    // See: https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
    var middleware = function middleware(_ref) {
        console.log("執行: thunk")
      var dispatch = _ref.dispatch,
          getState = _ref.getState;
      return function (next) {
        return function (action) {
          // The thunk middleware looks for any functions that were passed to `store.dispatch`.
          // If this "action" is really a function, call it and return the result.
          console.log("typeof action === 'function'",typeof action === 'function')
          if (typeof action === 'function') {
            console.log("next: ",next);
            console.log("action: ",action);
            // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
            return action(dispatch, getState, extraArgument);
          } // Otherwise, pass the action down the middleware chain as usual
  
          console.log("next: ",next);
          console.log("action: ",action);

          return next(action);
        };
      };
    };
  
    return middleware;
  }
  
  var thunk = createThunkMiddleware(undefined); // Attach the factory function so users can create a customized version
  // with whatever "extra arg" they want to inject into their thunks
  
//   thunk.withExtraArgument = createThunkMiddleware;
  export default thunk;