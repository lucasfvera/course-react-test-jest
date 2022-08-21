//-----TESTING ASYNC CODE
import * as React from 'react'

import { fireEvent, render, screen, waitFor } from "@testing-library/react"

//-----librería para interacciones más realistas /user-event
import userEvent from "@testing-library/user-event"

import {App} from './App';

//-----simulo la api y hago un mock para testearla (no hay q testear http req reales sino hacer una maqueta)
import api from './api'

// const mockCreateItem = jest.mock('./api');
const mockCreateItem = (api.createItem = jest.fn());




//----- para testear interacciones del usuario
//----- tiene q ser async xq simulo un http request
test('allows users to add elements to their list asynchronous', async ()=>{
    //---primer tengo q setear que quiero q devuelva este mock
    const todoText = "Testing adding item";
    mockCreateItem.mockResolvedValueOnce(({id: 123, text: todoText}))

    const { getByText, getByLabelText } = render(<App />)
    
    //---hago un query del elemento que testeo
    const input = getByLabelText("What needs to be done?");
    //---cambio el campo input
    fireEvent.change(input, {target: {value: todoText}});
    //---simulo click en el btn agregar
    fireEvent.click(getByText("Add #1"));

    
    
    //---chequeo si se agregó el elemento
    await waitFor(()=>getByText(todoText));
    
    //---chequeo si se mockeo bien
    expect(mockCreateItem).toHaveBeenCalledTimes(1);
    expect(mockCreateItem).toHaveBeenCalledWith(
        '/items',
        expect.objectContaining({text: todoText})
    )
    //---chequeo si cambió el texto del btn (funcionalidad de la app)
    // getByText("Add #2");
})