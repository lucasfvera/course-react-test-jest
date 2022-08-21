//-----TESTING ELEMENTS
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//-----dom testing library: para testear cosas como que las referencias entre labels e inputs sean correctas (cosas q no dependen de React específicamente)
import { getQueriesForElement } from "@testing-library/dom" //para no tener que hacer estos queries uso testing-library/react que ya tiene el método de render (ver archivo 2)

//-----importo el componente q quiero testear
import {App} from './App';

const render = component => {
  const root = document.createElement("div");
  ReactDOM.render(component, root);
  return getQueriesForElement(root);
}

test('renders the correct content', () => {
  //-----Render a React component to the DOM, puedo sacar esto afuera para hacer más limpio el cód
      // const root = document.createElement("div");
      // ReactDOM.render(<App />, root);



  //-----Use DOM APIs (querySelector) to make assertions
  // expect().toBe()
      // expect(root.querySelector("h1").textContent).toBe("TODOs");
      // expect(root.querySelector("label").textContent).toBe("What needs to be done?");
      // expect(root.querySelector("button").textContent).toBe("Add #1");

  //-----voy a reemplazar estos elems con lo sig. Así detectá mas errores (como una label sin vincular con un input)
  // const {getByText, getByLabelText} = getQueriesForElement(root);

  //-----uso el método que creé afuera
  const { getByText, getByLabelText} = render(<App />)

  //-----en estos casos no es necesario poner el expect ya que va a tirar error de todas formas al no encontrar ese texto
  expect(getByText("TODOs")).not.toBeNull();
  getByLabelText("What needs to be done?");
  expect(getByText("Add #1")).not.toBeNull()

});