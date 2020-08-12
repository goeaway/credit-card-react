import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { InputProps } from "@src/types";
import Input from "@src/style/input";
import Label from "@src/style/label";
import InputWrapper from "@src/style/input-wrapper";
import { FaCalendarTimes } from "react-icons/fa";
import InputIconWrapper from "@src/style/input-icon-wrapper";
import InputMessage from "@src/style/input-message";
import moment from "moment";
import { validateExpiry } from "@src/utils/expiry-validate";

const ExpiryInput : FC<InputProps> = ({ info, onValueChanged, showErrors, onFocusChanged }) => {
    const [val, setVal] = useState((info && info.value) || "");

    useEffect(() => {
        let reason = "";

        if(val.length === 0) {
            reason = "Expiry Required";
        } else {
            const valid = validateExpiry(val);
            reason = valid ? "" : "Expiry Invalid";
        }

        onValueChanged({ value: val, valid: reason === "", reason })
    }, [val]);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;

        if(!rawValue) {
            setVal("");
            return;
        }

        const removeNonNumeric = rawValue.replace(/[^0-9]/g, "");
        let splitEveryTwo = removeNonNumeric.match(/.{1,2}/g);

        if(splitEveryTwo.length > 2) {
            splitEveryTwo = splitEveryTwo.slice(0, 2);
        }

        setVal(splitEveryTwo.join("/"));
    }
    
    return (
        <InputWrapper role="expiry-input" error={showErrors && !!info && !!info.reason}>
            <Label role="expiry-input-label">Expiry</Label>
            <InputIconWrapper>
                <FaCalendarTimes className="input-icon" role="expiry-input-icon" />
                <Input 
                    role="expiry-input-text" 
                    type="text" 
                    value={val} 
                    onChange={changeHandler} 
                    maxLength="5" 
                    placeholder="MM/YY"
                    onBlur={() => onFocusChanged(false)} 
                    onFocus={() => onFocusChanged(true)} />
            </InputIconWrapper>
            {showErrors && !!info && !!info.reason && <InputMessage>{info.reason}</InputMessage>}
        </InputWrapper>
    );
}

export default ExpiryInput;