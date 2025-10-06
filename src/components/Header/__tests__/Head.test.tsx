import { render, screen} from '@testing-library/react';

import Header from "..";

describe('Testes para o componente Header',() => {
  test('Deve renderizar corretamente', () =>{
    render(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()

  })
})
