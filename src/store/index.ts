import {
  configureStore,
  combineReducers,
  PreloadedState,
  getDefaultMiddleware
} from '@reduxjs/toolkit'

import carrinhoReducer from './reducers/carrinho'

import api from '../services/api'

/*
  ROOTSTATE é um tipo que representa o formato completo do estado global da sua store Redux.
  Quando você cria sua store combinando vários reducers, o RootState corresponde ao tipo que
  descreve todo esse estado combinado. Ele é usado, por exemplo, para que o TypeScript saiba
  exatamente quais propriedades existem no estado global, tornando o uso de seletores como o
  useSelector mais seguro e com autocomplete.

  se você precisar acessar algum dado do Redux Store dentro de um componente, você pode usar
  o RootState para tipar corretamente seu seletor:

  const user = useSelector((state: RootState) => state.user)
*/
import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState'

import { getDefaultCompilerOptions } from 'typescript'

/*
// ---- Esta constante esta comentada pois foi usada apenas para apresentar
// ---- a primeira versão sem o uso da tecnologia do React Redux

export const store = configureStore({
  reducer: {
    carrinho: carrinhoReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})
*/

const rootReducer = combineReducers({
  carrinho: carrinhoReducer,
  [api.reducerPath]: api.reducer
})

export function configureStore(estadoInicial?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    estadoInicial
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof configureStore>
