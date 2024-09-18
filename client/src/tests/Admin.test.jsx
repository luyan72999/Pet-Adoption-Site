import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter from react-router-dom
import { Provider } from 'react-redux';
import store from '../redux/store/store'; // Import your Redux store
import Admin from "../components/Admin/AddPet";

test("Add pet component", () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        </Provider>
    );
    fireEvent.click(screen.getByText("AddPet"));
    
    expect(screen.getByText("Pet Image URL")).toBeInTheDocument();
});
