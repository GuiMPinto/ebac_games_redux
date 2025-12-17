import { render, screen } from '@testing-library/react'

// importando o componete Header
import Header from '..' // o mesmo .index

// Sempre que for trabalhar com o react-Redux todos os
// componentes tem que ficar dentro do Provider
import { Provider } from 'react-redux'

import { store } from '../../../store'

describe('Testes para o componente Header', () => {
  test('Deve renderizar corretamente', () => {
    render(
      <Provider store={store}>
        (<Header />)
      </Provider>
    )
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })
})
