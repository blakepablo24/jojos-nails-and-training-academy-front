import { render, screen } from "@testing-library/react";
import Login from "./Login"

test('Login inputs are empty and button is enabled', ()=> {
    render(<Login location={""}/>);
    expect(screen.getByRole("button", {name:/login/i})).toBeEnabled();
    expect(screen.getByPlaceholderText(/email/i)).toBeEmptyDOMElement();
    expect(screen.getByPlaceholderText(/password/i)).toBeEmptyDOMElement();
})