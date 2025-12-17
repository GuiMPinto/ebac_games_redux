// importa e congifura a função que determinar os estatos iniciais
import { PreloadedState } from '@reduxjs/toolkit'

import { RenderOptions } from '@testing-library/react'
import { RootState, AppStore, configureStore } from '../store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  estadoInicial?: PreloadedState<RootState>
  store?: AppStore
}

export function renderizarComProvider(
  elemeto: React.ReactElement,
  { estadoInicial = {}, store, ...opcoesAdicionais }: ExtendedRenderOptions = {}
)
