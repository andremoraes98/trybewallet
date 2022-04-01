import React, { Component } from 'react';
import Expenses from './Expenses';

class Table extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <Expenses />
      </table>
    );
  }
}

export default Table;
