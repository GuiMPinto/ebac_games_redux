// importa o componente testado
import Produtos from '..'

import { screen, waitFor } from '@testing-library/react'

// função criada para redenrizar elementos do React Redux
import { renderizarComProvider } from '../../../utils/tests'

// Depois de instalar o MSW Mock Service Word
// Vamos usar algumas ferrramentas dele
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// Agora vamos configuar o Mock
// Variavel usada para fazer as simulações de requisições
const mocks = [
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
    categoria: 'RPG',
    id: 2,
    imagem: ' ',
    plataformas: ['Ps2', 'Ps4'],
    preco: 140.5,
    precoAntigo: 1560.5,
    titulo: 'Camelot'
  },
  {
    categoria: 'Corrida',
    id: 3,
    imagem: ' ',
    plataformas: ['Xbox', 'Ps2'],
    preco: 150.5,
    precoAntigo: 160.5,
    titulo: 'Rachão'
  },
  {
    categoria: 'Luta',
    id: 4,
    imagem: ' ',
    plataformas: ['PC', 'Arcade'],
    preco: 140.5,
    precoAntigo: 1560.5,
    titulo: 'Mexe Comigo Não'
  }
]

// A constante server será o servidor
const server = setupServer(
  //  O rest é um utilitário fornecido pelo Mock Service Worker (MSW)
  //  para definir como as requisições HTTP devem ser interceptadas e
  //  respondidas nos testes. a função do rest é criar "handlers"
  //  (manipuladores) para simular as respostas das APIs. Você usa
  //  funções como rest.get, rest.post, etc., para indicar a rota e o
  //  tipo de requisição, além de definir a resposta simulada
  rest.get(
    'http://localhost:4000/produtos',
    // requisicao => Quem fez requisição
    // resposta => O que é enviado para na requisição
    // contexto => O conteúdo no qual é usado para fazer a reposta
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

// SWITCH de teste
describe('Testes para do componente Produtos', () => {
  // É testado antes de todos os testes
  beforeAll(() => server.listen())

  // É compilado logo depois de cada test. Resetar alguns
  // resquicios que é deixado pelas requisições
  afterAll(() => server.resetHandlers())

  // Trecho de código lido depois de todos dentro do SWITCH
  afterAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregamento', () => {
    renderizarComProvider(<Produtos />)
    expect(screen.getAllByText('Carregando...')).toBeInTheDocument()
  })
  // o Jest faz o seu processamento de forma assincrono
  // Este teste será feito de forma sincrona
  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    const { debug } = renderizarComProvider(<Produtos />)
    debug()
    await waitFor(() => {
      expect(screen.getAllByText('Rachão')).toBeInTheDocument()
    })
  })
})
