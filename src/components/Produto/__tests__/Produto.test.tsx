// importa o componente que será testado
import Produto from '..'

import { renderizarComProvider } from '../../../utils/tests'
import { fireEvent, screen } from '@testing-library/react'

const jogo = {
  // trecho de código para ser testado
  // testado logo abaixo
  categoria: 'Plataforma',
  id: 1,
  imagem: ' ',
  plataformas: ['Ps1', 'Ps2'],
  preco: 150.5,
  precoAntigo: 160.5,
  titulo: 'Brutal Sword'
}

describe('Testes para o componente Produto', () => {
  test('Deve renderizar corretamente', () => {
    renderizarComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Brutal Sword')).toBeInTheDocument()
  })
  test('Deve adicionar um item ao carrinho', () => {
    const { store } = renderizarComProvider(<Produto game={jogo} />)
    // Testa se existe o botão adicionar
    fireEvent.click(screen.getByTestId('btn-adicionar-produto'))

    // Testa a quantidade de itens Objetos jogo que simula o
    // componente Produto
    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
