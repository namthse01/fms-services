import { configureStore } from "@reduxjs/toolkit";

//Reducers
import { apiSlice } from "./apiSlice";
import authReducer from "./auth/authSlice";


// const sagaMiddleware = createSagaMiddleware();

// const reducer = combineReducers({
//   booking: bookingReducer,
//   account: accountReducer,
//   minorState: minorStateReducer,
//   toast: toastReducer,
//   auth: authReducer,
// });

// const middleware = [sagaMiddleware];

// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => [
//     ...getDefaultMiddleware({ thunk: false }),
//     ...middleware,
//   ],
// });

// sagaMiddleware.run(watcherSaga);

// export default store;

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
