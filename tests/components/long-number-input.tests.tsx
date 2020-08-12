import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { createSandbox, SinonStub, SinonSpy } from "sinon";
import LongNumberInput from "@src/components/long-number-input";
import { ValueValid } from "@src/types";

const sandbox = createSandbox();

beforeEach(() => {
    sandbox.restore();
});

const setup = (info?: ValueValid, onChange?: SinonStub | SinonSpy, onFocusChanged?: SinonStub | SinonSpy) => {
    return render(<LongNumberInput 
        onValueChanged={onChange || sandbox.stub()} 
        onFocusChanged={onFocusChanged || sandbox.stub()}
        info={info} />);
}

it("should display a label", () => {
    const { getByText } = setup();
    getByText("Card Number");
});

it("should display a text input", () => {
    const { getByRole } = setup();
    getByRole("long-number-input-text");
});

it("should alter value before passing to onValueChanged by adding space every 4 chars", () => {
    const sixteenCharString = "aaaabbbbccccdddd";
    const valueChanged = sandbox.stub();
    const { getByRole } = setup(undefined, valueChanged);

    act(() => {
        fireEvent.change(getByRole("long-number-input-text"), { target: { value: sixteenCharString }});
    });

    expect(valueChanged.calledTwice).toBe(true);
    expect(valueChanged.secondCall.args[0].value).toBe("aaaa bbbb cccc dddd");
});

it("should not allow a string greater than 19 chars (16 with 3 spaces)", () => {
    const seventeenCharString = "aaaabbbbccccdddde";
    const valueChanged = sandbox.stub();
    const { getByRole } = setup(undefined, valueChanged);

    act(() => {
        fireEvent.change(getByRole("long-number-input-text"), { target: { value: seventeenCharString }});
    });

    expect(valueChanged.calledTwice).toBe(true);
    expect(valueChanged.secondCall.args[0].value.length).toBe(19);
});

it("should allow user to delete the last value from the string", () => {
    const INPUT = "a";
    const valueChanged = sandbox.stub();
    const { getByRole } = setup(undefined, valueChanged);

    act(() => {
        fireEvent.change(getByRole("long-number-input-text"), { target: { value: INPUT }});
    });

    act(() => {
        fireEvent.change(getByRole("long-number-input-text"), { target: { value: "" } });
    });

    expect(valueChanged.calledThrice).toBe(true);
    expect(valueChanged.thirdCall.args[0]).toEqual({reason: "Number Required", valid: false, value: ""});
});

it("should call onFocusChanged when input is focused", () => {
    const stub = sandbox.stub();
    const { getByPlaceholderText } = setup(undefined, undefined, stub);

    act(() => {
        fireEvent.focus(getByPlaceholderText("**** **** **** ****"));
    });

    expect(stub.calledOnce).toBe(true);
    expect(stub.firstCall.args).toEqual([true]);
});

it("should call onFocusChanged with false when input is blurred", () => {
    const stub = sandbox.stub();
    const { getByPlaceholderText } = setup(undefined, undefined, stub);

    act(() => {
        fireEvent.focus(getByPlaceholderText("**** **** **** ****"));
    });

    act(() => {
        fireEvent.blur(getByPlaceholderText("**** **** **** ****"));
    });

    expect(stub.calledTwice).toBe(true);
    expect(stub.secondCall.args).toEqual([false]);
});