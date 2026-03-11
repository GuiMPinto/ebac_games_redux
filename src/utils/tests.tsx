// importa e congifura a função que determinar os estatos iniciais
import { PreloadedState } from '@reduxjs/toolkit'

import { Provider } from 'react-redux'

// -- RenderOptions --
// RenderOptions função que vem testing library. No contexto do React Testing
// Library, o RenderOptions é um objeto de configuração opcional que pode ser
// passado para a função render ao renderizar um componente para teste.
import { render, RenderOptions } from '@testing-library/react'

import { RootState, AppStore, criarStore } from '../store'
import { PropsWithChildren } from 'react'

// -- ExtendedRenderOptions --
// ExtendedRenderOptions é um tipo de configuração adicional que pode ser
// fornecido à função de renderização ao criar testes para seus componentes React.

// Basicamente, ao utilizar a função render (geralmente importada de
// '@testing-library/react'), você pode passar opções extras para definir o
// ambiente de teste, como wrappers personalizados, estados iniciais, rotas,
// contexto, entre outros.

// ExtendedRenderOptions personaliza o ambiente do render no teste, permitindo um
// controle maior sobre como o componente será testado em diferentes situações.

// -- interface --
// No documento tests.tsx, a palavra-chave interface é utilizada para definir um
// "contrato" de tipos no TypeScript. Ela serve para descrever a estrutura de um
// objeto, ou seja, quais propriedades ele deve ter e qual o tipo de cada uma.

// No contexto de testes com React e Redux (e geralmente em aplicações com
// TypeScript), é comum usar interfaces para:
// -- Definir o formato das props que um componente recebe;
// -- Tipar o estado (state) do Redux;
// -- Tipar objetos em funções de teste, para garantir que têm as propriedades
// esperadas.

/*
  Por exemplo, se tivermos uma interface assim:
  interface Produto {
    id: number;
    nome: string;
    preco: number;
  }

  Isso significa que qualquer objeto do tipo Produto deve ter essas três
  propriedades, com os tipos definidos. Isso traz mais segurança ao código, já que
  ferramentas como o VSCode podem alertar sobre usos incorretos ou propriedades
  faltantes, evitando bugs.
*/

// interface ajuda a organizar, documentar e tornar seu código mais seguro,
// principalmente em times e em projetos maiores.

/*
  Quando trabalhamos com testes em React usando TypeScript, as interfaces
  são grandes aliadas para garantir que as estruturas de dados tenham o
  formato esperado. Veja, por exemplo, como uma interface pode ser usada em
  um arquivo tests.tsx:

  Suponha que você tenha um componente que recebe props:

  interface ProdutoProps {
    id: number;
    nome: string;
    preco: number;
  }

  No seu teste, se você vai criar um mock dessas props para testar o componente,
  pode usar a interface para tipá-lo corretamente:

  const produtoTeste: ProdutoProps = {
    id: 1,
    nome: 'Camiseta',
    preco: 29.9
  };
  Assim, se por acaso faltar uma propriedade ou se o tipo estiver errado, o próprio
  TypeScript vai avisar. Isso evita erros no momento do teste e simula melhor o
  funcionamento do componente na prática.

  Outro exemplo comum é ao testar o Redux, onde você pode tipar o estado da store:

  interface EstadoApp {
    produtos: ProdutoProps[];
    usuario: string;
  }

  const estadoInicial: EstadoApp = {
    produtos: [],
    usuario: ''
  };
  Assim, quando você cria stores mockadas para testar ações e reducers, mantém o
  padrão do estado do aplicativo.

  Resumo das vantagens de aplicar interface em testes:

  Garante que os mocks e objetos dos testes tenham o formato correto;
  Ajuda no autocomplete dos editores de código;
  Evita bugs que só seriam descobertos na execução do teste.

*/
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  // RootState é um tipo que representa o formato completo do estado global da sua
  // store Redux. Quando você cria sua store combinando vários reducers, o RootState
  // corresponde ao tipo que descreve todo esse estado combinado. Ele é usado, por
  // exemplo, para que o TypeScript saiba exatamente quais propriedades existem no
  // estado global, tornando o uso de seletores como o useSelector mais seguro e com
  // autocomplete.

  // RootState é um tipo que descreve toda a estrutura do estado da store Redux,
  // garantindo tipagem segura ao acessar ou manipular dados do seu estado global.
  estadoInicial?: PreloadedState<RootState>
  store?: AppStore
}

export function renderizarComProvider(
  elemeto: React.ReactElement, // Recebe uma função que é um elemento do React
  {
    estadoInicial = {},
    store = criarStore(estadoInicial),
    ...opcoesAdicionais
  }: ExtendedRenderOptions = {}
) {
  /*
  // O termo "encapsulador" geralmente se refere a um componente ou função que
  // envolve (ou seja, encapsula) outros elementos, servindo como um "container"
  // para controlar algum aspecto do seu comportamento, aparência ou dado.
  // No React, por exemplo, um componente encapsulador pode ser aquele que recebe
  // outros componentes como filhos (children) e fornece algum contexto, lógica ou
  // estrutura adicional, sem que esses filhos saibam o que está acontecendo
  // "por fora". Essa prática ajuda a organizar e isolar responsabilidades,
  // facilitando a manutenção e os testes do código.

  Um exemplo simples de componente encapsulador em React:

  function Encapsulador({ children }) {
    return (
      <div className="meu-encapsulador">
        {children}
      </div>
    );
  }

  // Uso:
  <Encapsulador>
    <MeuOutroComponente />
  </Encapsulador>
  // Nesse caso, Encapsulador envolve e controla o que está dentro dele,
  // podendo adicionar estilos ou lógica extra.
*/
  // eslint-disable-next-line @typescript-eslint/ban-types
  function encapsulador({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    store,
    ...render(elemeto, { wrapper: encapsulador, ...opcoesAdicionais })
  }
}
