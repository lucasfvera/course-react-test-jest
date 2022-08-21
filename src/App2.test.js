//-----TESTING USER INTERACTION
import * as React from 'react'

import { fireEvent, render, screen } from "@testing-library/react"

//-----librería para interacciones más realistas /user-event
import userEvent from "@testing-library/user-event"

import {App} from './App';
import api from './api'

//-----reemplazo esta función por el método dentro de la librería react
// const render = component => {
//   const root = document.createElement("div");
//   ReactDOM.render(component, root);
//   return getQueriesForElement(root);
// }

test('renders the correct content', () => {
  //---uso el método que creé afuera
  const { getByText, getByLabelText } = render(<App />)

  //---en estos casos no es necesario poner el expect ya que va a tirar error de todas formas al no encontrar ese texto
  expect(getByText("TODOs")).not.toBeNull();
  getByLabelText("What needs to be done?");
  expect(getByText("Add #1")).not.toBeNull()
//   screen.debug();  -----para loggear elems a la consola
//   screen.logTestingPlaygroundURL();  -----para loggear elems en una URL generada
});


//----- para testear interacciones del usuario
test('allows users to add elements to their list', ()=>{
    const { getByText, getByLabelText } = render(<App />)
    
    //---hago un query del elemento que testeo
    const input = getByLabelText("What needs to be done?");
    //---cambio el campo input
    fireEvent.change(input, {target: {value: "Testing adding item"}});
    //---simulo click en el btn agregar
    fireEvent.click(getByText("Add #1"));

    //---chequeo si se agregó el elemento
    getByText("Testing adding item");
    //---chequeo si cambió el texto del btn (funcionalidad de la app)
    getByText("Add #2");
})