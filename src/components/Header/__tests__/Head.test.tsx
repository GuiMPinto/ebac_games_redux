import { render, screen } from '@testing-library/react'

// importando o componete Header
import Header from '..' // o mesmo .index

// Sempre que for trabalhar com o react-Redux todos os
// componentes tem que ficar dentro do Provider
import { Provider } from 'react-redux'

import { store } from '../../../store'
import { renderizarComProvider } from '../../../utils/tests'

describe('Testes para o componente Header', () => {
  test('Deve renderizar corretamente', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    // A função screen é um objeto utilitário que facilita o
    // acesso aos métodos de consulta do DOM renderizado durante
    // os testes. Após você renderizar um componente com o método
    // render, o screen possibilita que você consulte elementos
    // da tela usando funções como getByText, getByRole,
    // getByTestId, entre outras.

    // Dessa forma, não é necessário utilizar o resultado da
    // função render para buscar elementos; o screen já fornece
    // acesso global ao DOM renderizado do teste atual.
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Renderizar se há 2 itens no carrinho', () => {
    renderizarComProvider(<Header />, {
      estadoInicial: {
        carrinho: {
          // Este itens são apenas para teste não são
          // necessariamente os de db.json
          itens: [
            {
              categoria: 'Plataforma',
              id: 1,
              imagem: ' ',
              plataformas: ['Ps1', 'Ps2'],
              preco: 150.5,
              precoAntigo: 160.5,
              titulo: 'Brutal Sword'
            },
            {
              categoria: 'Tiro',
              id: 2,
              imagem: ' ',
              plataformas: ['Ps3', 'Ps4'],
              preco: 140.5,
              precoAntigo: 1560.5,
              titulo: 'Tirambasso'
            }
          ]
        }
      }
    })
    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2')
  })
})
