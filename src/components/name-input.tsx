import React, { FC, useState, useEffect } from "react";
import { InputProps } from "@src/types";
import Label from "@src/style/label";
import Input from "@src/style/input";
import InputWrapper from "@src/style/input-wrapper";
import { FaAddressCard } from "react-icons/fa";
import InputIconWrapper from "@src/style/input-icon-wrapper";
import InputMessage from "@src/style/input-message";

export interface NameInputProps extends InputProps {
    placeholderName?: string;
}

const NameInput : FC<NameInputProps> = ({showErrors, info, onValueChanged, placeholderName, onFocusChanged }) => {
    const [val, setVal] = useState((info && info.value) || "");

    useEffect(() => {
        const valid = val.length > 0;
        onValueChanged({ value: val, valid, reason: !valid && "Name Required" })
    }, [val]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value);
    }

    return (
        <InputWrapper role="name-input" error={showErrors && !!info && !!info.reason}>
            <Label role="name-input-label">Cardholder Name</Label>
            <InputIconWrapper>
                <FaAddressCard className="input-icon" />
                <Input 
                    maxLength="25"
                    role="name-input-text" 
                    type="text" 
                    value={val} 
                    onChange={changeHandler} 
                    placeholder={placeholderName}
                    onBlur={() => onFocusChanged(false)} 
                    onFocus={() => onFocusChanged(true)} />
            </InputIconWrapper>
            {showErrors && !!info && !!info.reason && <InputMessage>{info.reason}</InputMessage>}
        </InputWrapper>
    )
}

export default NameInput;