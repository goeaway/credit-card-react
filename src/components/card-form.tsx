import React, { FC, useState, useEffect, useRef } from "react";
import Card from "./card";
import LongNumberInput from "./long-number-input";
import ExpiryInput from "./expiry-input";
import NameInput from "./name-input";
import SecurityInput from "./security-input";
import { ValueValid } from "@src/types";
import Submit from "@src/style/submit";
import Form from "@src/style/form";
import InlineInputWrapper from "@src/style/inline-input-wrapper";
import { getRandomName } from "@src/utils/random-name";

const CardForm : FC = () => {
    const [name, setName] = useState<ValueValid>({ value: "", valid: true, reason: "" });
    const [longNumber, setLongNumber] = useState<ValueValid>({ value: "", valid: true, reason: "" });
    const [expiry, setExpiry] = useState<ValueValid>({ value: "", valid: true, reason: "" });
    const [security, setSecurity] = useState<ValueValid>({ value: "", valid: true, reason: "" });
    const [touched, setTouched] = useState(false);
    const placeholderName = useRef(getRandomName());
    const [focusedInput, setFocusedInput] = useState<string>(null);

    const nameChangeHandler = (info: ValueValid) => {
        setName(info);
    }

    const numberChangeHandler = (info: ValueValid) => {
        setLongNumber(info);
    }

    const expiryChangeHandler = (info: ValueValid) => {
        setExpiry(info);
    };

    const securityChangeHandler = (info: ValueValid) => {
        setSecurity(info);
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!touched) {
            setTouched(true);
        }

        if(!name.valid || !longNumber.valid || !expiry.valid || !security.valid) {
            return;
        }

        alert("Thank you for paying!");
    }

    const genericInputFocusChangeHandler = (focused: boolean, input: string) => {
        if(focused) {
            setFocusedInput(input);
        } else if (focusedInput === input) {
            setFocusedInput(null);
        }
    }

    const nameInputFocusChangeHandler = (focused: boolean) => {
        genericInputFocusChangeHandler(focused, "name");
    }

    const numberInputFocusChangeHandler = (focused: boolean) => {
        genericInputFocusChangeHandler(focused, "number");
    }

    const expiryInputFocusChangeHandler = (focused: boolean) => {
        genericInputFocusChangeHandler(focused, "expiry");
    }

    const securityInputFocusChangeHandler = (focused: boolean) => {
        genericInputFocusChangeHandler(focused, "security");
    }

    return (
        <Form role="card-form" onSubmit={submitHandler}>
            <Card 
                name={name.value || placeholderName.current} 
                number={longNumber.value} 
                expiry={expiry.value} 
                security={security.value} 
                focused={focusedInput} />
            
            <NameInput 
                onValueChanged={nameChangeHandler} 
                info={name} 
                showErrors={touched} 
                placeholderName={placeholderName.current} 
                onFocusChanged={nameInputFocusChangeHandler} />

            <LongNumberInput 
                onValueChanged={numberChangeHandler} 
                info={longNumber} 
                showErrors={touched}
                onFocusChanged={numberInputFocusChangeHandler} />

            <InlineInputWrapper>
                <ExpiryInput 
                    onValueChanged={expiryChangeHandler} 
                    info={expiry} 
                    showErrors={touched}
                    onFocusChanged={expiryInputFocusChangeHandler} />
                    
                <SecurityInput 
                    onValueChanged={securityChangeHandler} 
                    info={security} 
                    showErrors={touched} 
                    onFocusChanged={securityInputFocusChangeHandler} />
            </InlineInputWrapper>

            <Submit type="submit">Pay</Submit>
        </Form>
    );
}

export default CardForm;
