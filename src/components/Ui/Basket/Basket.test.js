import { render, screen } from "@testing-library/react";
import Basket from "./Basket"

test('Contact Form details are empty', ()=> {
    render(<Basket itemsInBasket={[]} />);
    // expect(screen.getByRole("button", {name:/login/i})).toBeEnabled();
    // expect(screen.getByPlaceholderText(/Full Name/i)).toBeEmptyDOMElement();
    // expect(screen.getByPlaceholderText(/Email Address/i)).toBeEmptyDOMElement();
    // expect(screen.getByPlaceholderText(/Contact Number/i)).toBeEmptyDOMElement();
    // screen.debug();
})