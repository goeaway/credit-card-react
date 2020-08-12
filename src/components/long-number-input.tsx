import React, { FC, useState, ChangeEvent, useEffect, useRef } from "react";
import Label from "@src/style/label";
import Input from "@src/style/input";
import { InputProps } from "@src/types";
import { validate } from "@src/utils/long-number-utils";
import InputWrapper from "@src/style/input-wrapper";
import InputMessage from "@src/style/input-message";
import { FaCreditCard } from "react-icons/fa";
import InputIconWrapper from "@src/style/input-icon-wrapper";

const LongNumberInput : FC<InputProps> = ({ info, onValueChanged, showErrors, onFocusChanged }) => {
    const [val, setVal] = useState((info && info.value) || "");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // validity check here
        const valid = validate(val.replace(/\s/g, "").trim());
        onValueChanged({ value:val, valid, reason: val.length == 0 ? "Number Required" : !valid && "Number Invalid"});
    }, [val]);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // remove spaces, split value into chunks of 4
        const rawVal = event.target.value;

        if(!rawVal) {
            setVal("");
            return;
        }

        const spacesRemoved = rawVal.replace(/\s/g, "");
        let splitEveryFour = spacesRemoved.match(/.{1,4}/g);

        if(splitEveryFour.length > 4) {
            splitEveryFour = splitEveryFour.slice(0, 4);
        }

        setVal(splitEveryFour.join(" "));
    }

    return (
        <InputWrapper role="long-number-input" error={showErrors && !!info && !!info.reason}>
            <Label role="long-number-input-label">Card Number</Label>
            <InputIconWrapper>
                <FaCreditCard role="long-number-input-icon" className="input-icon" />
                <Input 
                    ref={inputRef}
                    role="long-number-input-text"
                    type="text" 
                    value={val} 
                    onChange={changeHandler} 
                    maxLength="19" 
                    placeholder="**** **** **** ****"
                    onBlur={() => onFocusChanged(false)} 
                    onFocus={() => onFocusChanged(true)} />
            </InputIconWrapper>
            {showErrors && !!info && !!info.reason && <InputMessage>{info.reason}</InputMessage>}
        </InputWrapper>
    );
}

export default LongNumberInput;