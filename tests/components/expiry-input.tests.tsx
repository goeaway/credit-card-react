import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import ExpiryInput from "@src/components/expiry-input";
import { createSandbox } from "sinon";

const sandbox = createSandbox();

beforeEach(() => {
    sandbox.restore();
});

it("should display a wrapper", () => {
    const { getByRole } = render(<ExpiryInput onValueChanged={() => {}} onFocusChanged={() => {}} />);
    getByRole("expiry-input");
});

it("should display a label", () => {
    const { getByRole } = render(<ExpiryInput onValueChanged={() => {}} onFocusChanged={() => {}} />);
    getByRole("expiry-input-label");
});

it("should display a calendar icon", () => {
    const { getByRole } = render(<ExpiryInput onValueChanged={() => {}} onFocusChanged={() => {}} />);
    getByRole("expiry-input-icon");
});

it("should display an input", () => {
    const { getByPlaceholderText } = render(<ExpiryInput onValueChanged={() => {}} onFocusChanged={() => {}} />);
    getByPlaceholderText("MM/YY");
});

it("should not display a message", () => {
    const { queryByText } = render(<ExpiryInput onValueChanged={() => {}} onFocusChanged={() => {}} />);
    expect(queryByText("Expiry Required")).toBeNull();
});

it("should not display a message if showErrors is false but there is a message", () => {
    const MESSAGE = "test message";
    const { queryByText } = render(<ExpiryInput onValueChanged={() => {}} onFocusChanged={() => {}} info={{value: "", reason: MESSAGE, valid: false }} />);
    expect(queryByText(MESSAGE)).toBeNull();
});

it("should not display a message if showErrors is true but there is no message", () => {
    const MESSAGE = "test message";
    const { queryByText } = render(<ExpiryInput onValueChanged={() => {}} onFocusChanged={() => {}} info={{value: "", reason: "", valid: false }} showErrors />);
    expect(queryByText(MESSAGE)).toBeNull();
})


it("should display a message if showErrors is true and there is a message", () => {
    const MESSAGE = "test message";
    const { getByText } = render(<ExpiryInput onValueChanged={() => {}} onFocusChanged={() => {}} info={{value: "", reason: MESSAGE, valid: false }} showErrors />);
    getByText(MESSAGE);
})

it("should alter value before passing on by formatting value as MM/YY", () => {
    const INPUTTED_VALUE = "0101";
    const valueStub = sandbox.stub();
    const { getByPlaceholderText } = render(<ExpiryInput onValueChanged={valueStub} onFocusChanged={() => {}} />);
    
    act(() => {
        fireEvent.change(getByPlaceholderText("MM/YY"), { target: { value: INPUTTED_VALUE }});
    });

    expect(valueStub.calledTwice).toBe(true);
    expect(valueStub.secondCall.args[0].value).toBe("01/01");
});

it("should call onFocusChanged when input is focused", () => {
    const stub = sandbox.stub();
    const { getByPlaceholderText } = render(<ExpiryInput onValueChanged={() => {}} onFocusChanged={stub} />);

    act(() => {
        fireEvent.focus(getByPlaceholderText("MM/YY"));
    });

    expect(stub.calledOnce).toBe(true);
    expect(stub.firstCall.args).toEqual([true]);
});

it("should call onFocusChanged with false when input is blurred", () => {
    const stub = sandbox.stub();
    const { getByPlaceholderText } = render(<ExpiryInput onValueChanged={() => {}} onFocusChanged={stub} />);

    act(() => {
        fireEvent.focus(getByPlaceholderText("MM/YY"));
    });

    act(() => {
        fireEvent.blur(getByPlaceholderText("MM/YY"));
    });

    expect(stub.calledTwice).toBe(true);
    expect(stub.secondCall.args).toEqual([false]);
});

