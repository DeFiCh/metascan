import { configureStore } from "@reduxjs/toolkit";
import {
  contractApi,
  contractMethodsApi,
  contractVerificationApi,
} from "@store/contract";
import { searchApi } from "@store/search";
import { tokenApi } from "@store/token";

export function initializeStore() {
  return configureStore({
    reducer: {
      [searchApi.reducerPath]: searchApi.reducer,
      [contractApi.reducerPath]: contractApi.reducer,
      [contractMethodsApi.reducerPath]: contractMethodsApi.reducer,
      [contractVerificationApi.reducerPath]: contractVerificationApi.reducer,
      [tokenApi.reducerPath]: tokenApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        searchApi.middleware,
        contractApi.middleware,
        contractMethodsApi.middleware,
        contractVerificationApi.middleware,
        tokenApi.middleware
      ),
  });
}

export type RootStore = ReturnType<typeof initializeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
