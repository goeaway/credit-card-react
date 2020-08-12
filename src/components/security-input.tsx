import React, { FC, useState, useEffect } from "react";
import { InputProps } from "@src/types";
import Label from "@src/style/label";
import Input from "@src/style/input";
import InputWrapper from "@src/style/input-wrapper";
import { FaKey } from "react-icons/fa";
import InputIconWrapper from "@src/style/input-icon-wrapper";
import InputMessage from "@src/style/input-message";

const SecurityInput : FC<InputProps> = ({showErrors, info, onValueChanged, onFocusChanged}) => {
    const [val, setVal] = useState((info && info.value) || "");

    useEffect(() => {
        const valid = val.length > 0;
        onValueChanged({ value: val, valid, reason: !valid && "CVV Required" })
    }, [val]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value);
    }

    return (
        <InputWrapper role="security-input" error={showErrors && !!info && !!info.reason}>
            <Label role="security-input-label">CVV</Label>
            <InputIconWrapper>
                <FaKey className="input-icon" />
                <Input 
                    role="security-input-text" 
                    type="text" 
                    maxLength="3" 
                    value={val} 
                    placeholder="***" 
                    onChange={changeHandler} 
                    onBlur={() => onFocusChanged(false)} 
                    onFocus={() => onFocusChanged(true)} />
            </InputIconWrapper>
            {showErrors && !!info && !!info.reason && <InputMessage>{info.reason}</InputMessage>}
        </InputWrapper>
    )
}

export default SecurityInput;