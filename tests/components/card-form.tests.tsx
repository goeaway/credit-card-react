import React from "react";
import { createSandbox } from "sinon";
import { render, act, fireEvent } from "@testing-library/react";
import CardForm from "@src/components/card-form";
import "jest-styled-components";

const sandbox = createSandbox();

beforeEach(() => {
    sandbox.restore();
});

it("should display a card-form", () => {
    const { getByRole } = render(<CardForm />);
    getByRole("card-form");
});

it("should display a card", () => {
    const { getByRole } = render(<CardForm />);
    getByRole("card");
});

it("should display a long number input", () => {
    const { getByRole } = render(<CardForm />);
    getByRole("long-number-input");
});

it("should display a name input", () => {
    const { getByRole } = render(<CardForm />);
    getByRole("name-input");
});

it("should display an expiry input", () => {
    const { getByRole } = render(<CardForm />);
    getByRole("expiry-input");
});

it("should display a security-input", () => {
    const { getByRole } = render(<CardForm />);
    getByRole("security-input");
});

it("should display a submit button", () => {
    const {getByText} = render(<CardForm />);
    getByText("Pay");
});

it("change in long number input should show on the card", () => {
    const INPUTTED = "1234";
    const {getByPlaceholderText, getByText } = render(<CardForm />);
    act(() => {
        fireEvent.change(getByPlaceholderText("**** **** **** ****"), { target: { value: INPUTTED }});
    });

    getByText("1234 **** **** ****");
});

it("change in name input should show on the card", () => {
    const INPUTTED = "name";
    const {getByRole, getByText} = render(<CardForm />);
    act(() => {
        fireEvent.change(getByRole("name-input-text"), { target: { value: INPUTTED }});
    });

    getByText(INPUTTED);
});

it("change in expiry input should show on the card", () => {
    const INPUTTED = "01";
    const {getByRole, getByText} = render(<CardForm />);
    act(() => {
        fireEvent.change(getByRole("expiry-input-text"), { target: { value: INPUTTED }});
    });

    getByText(INPUTTED + "/YY");
});

it("change in security input should show on the card", () => {
    const INPUTTED = "1";
    const {getByRole, getByText} = render(<CardForm />);
    act(() => {
        fireEvent.change(getByRole("security-input-text"), { target: { value: INPUTTED }});
    });

    getByText(INPUTTED + "**");
});

it("should show the card front when the security input is not focused", () => {
    const { getByRole } = render(<CardForm />);

    expect(getByRole("card")).not.toHaveStyleRule("transform", "rotateY(180deg)");
});

it("should show the card back when the security input is focused", () => {
    const { getByPlaceholderText, getByRole } = render(<CardForm />);
    act(() => {
        fireEvent.focus(getByPlaceholderText("***"));
    });

    expect(getByRole("card")).toHaveStyleRule("transform", "rotateY(180deg)");
});

it("should show the card front when the security input is blurred", () => {
    const { getByPlaceholderText, getByRole } = render(<CardForm />);
    
    act(() => {
        fireEvent.focus(getByPlaceholderText("***"));
    });

    act(() => {
        fireEvent.blur(getByPlaceholderText("***"));
    });

    expect(getByRole("card")).not.toHaveStyleRule("transform", "rotateY(180deg)");
});