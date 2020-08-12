import React, { FC, useState, useEffect, useRef } from "react";
import styled, {css} from "styled-components";

export interface CardProps {
    name: string;
    number: string;
    expiry: string;
    security: string;
    focused: string;
}

const longNumberPlaceholder = "**** **** **** ****";
const expiryPlaceholder = "MM/YY";
const securityPlaceholder = "***";

const Card : FC<CardProps> = ({name, number, expiry, security, focused}) => {
    const [nameDisplay, setNameDisplay] = useState(name);
    const [numberDisplay, setNumberDisplay] = useState(longNumberPlaceholder);
    const [expiryDisplay, setExpiryDisplay] = useState(expiryPlaceholder);
    const [securityDisplay, setSecurityDisplay] = useState(securityPlaceholder);

    useEffect(() => {
        setNameDisplay(name);
    }, [name]);

    useEffect(() => { 
        // get the number, replace the placeholder with it's length
        if(number.length <= longNumberPlaceholder.length) {
            const combined = number + longNumberPlaceholder.substring(number.length);
            setNumberDisplay(combined);
        } else {
            // just put the number in instead
            setNumberDisplay(number);
        }
    }, [number]);

    useEffect(() => {
        if(expiry.length <= expiryPlaceholder.length) {
            const combined = expiry + expiryPlaceholder.substring(expiry.length);
            setExpiryDisplay(combined);
        } else {
            // just put the number in instead
            setExpiryDisplay(expiry);
        }
    }, [expiry]);

    useEffect(() => {
        if(security.length <= securityPlaceholder.length) {
            const combined = security + securityPlaceholder.substring(security.length);
            setSecurityDisplay(combined);
        } else {
            // just put the number in instead
            setSecurityDisplay(number);
        }
    }, [security]);

    return (
        <CardAnimator>
            <CardContainer showBack={focused === "security"} role="card">
                <CardFront role="card-front">
                    <ChipWrapper>
                        <Chip>
                            <ChipLine />
                            <ChipLine />
                            <ChipLine />
                            <ChipLine />
                            <ChipMain />
                        </Chip>
                    </ChipWrapper>
                    <DetailsWrapper>
                        <NumberWrapper>
                            <Display focus={focused === "number"}>{numberDisplay}</Display>
                        </NumberWrapper>
                        <ExpiryWrapper>
                            <ExpiryText>EXP END</ExpiryText> <Display focus={focused === "expiry"}>{expiryDisplay}</Display>
                        </ExpiryWrapper>
                        <NameWrapper >
                            <Display focus={focused === "name"}>{nameDisplay}</Display>
                        </NameWrapper>
                    </DetailsWrapper>
                    <ProviderWrapper />
                </CardFront>
                <CardBack role="card-back">
                    <Strip />
                    <SecurityWrapper>
                        <Display focus={focused === "security"}>
                            {securityDisplay}
                        </Display>
                    </SecurityWrapper>
                </CardBack>
            </CardContainer>
        </CardAnimator>
    );
}

export default Card;

const CardAnimator = styled.div`
    margin-bottom: 3rem;
    perspective: 1000px;
`

interface CardContainerProps {
    showBack?: boolean;
}

const CardContainer = styled.div`
    letter-spacing: 2px;
    position: relative;
    width: 100%;
    height: 235px;
    background: transparent;
    transition: transform 800ms;
    transform-style: preserve-3d;

    ${(p: CardContainerProps) => p.showBack && css`
        transform: rotateY(180deg);
    `}
`
    
const CardFace = styled.div`
    box-shadow:
    0 0.5px 0.9px rgba(0, 0, 0, 0.02),
    0 1.3px 2.2px rgba(0, 0, 0, 0.028),
    0 2.4px 4.1px rgba(0, 0, 0, 0.035),
    0 4.2px 7.4px rgba(0, 0, 0, 0.042),
    0 7.9px 13.8px rgba(0, 0, 0, 0.05),
    0 19px 33px rgba(0, 0, 0, 0.07)
    ;
    border-radius: 10px;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    overflow: hidden;
`

const CardFront = styled(CardFace)`
    background: url(/images/space.jpg) 50% 50% / 100% no-repeat;
    color: white;
    font-family: 'Inconsolata', monospace;
    display: grid;
    grid-template-columns: 2rem auto 2rem;
    grid-template-rows: 52% 48%;
`

const CardBack = styled(CardFace)`
    transform: rotateY(180deg);
    background: #F98F11;
    z-index: 2;

    display: grid;
    grid-template-rows: 1rem 60px auto;
    grid-template-columns: 70% auto;
`

const DetailsWrapper = styled.div`
    grid-column-start: 2;
    grid-row-start: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 1rem;
`

const NameWrapper = styled.div`
    text-transform: uppercase;
`

const NumberWrapper = styled.div`
    font-size: 24px;
`

const ExpiryWrapper = styled.div`
    font-size: 16px;
`

const ExpiryText = styled.span`
    font-size: 10px;
    padding-left: .25rem;
`

const SecurityWrapper = styled.div`
    grid-column-start: 1;
    grid-row-start: 3;
    display flex;
    width: 100%;
    margin: .5rem;
    background: white;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: .5rem;
    font-size: 14px;
`

const ProviderWrapper = styled.div`
    grid-column-start: 2;
    grid-row-start: 2;
`

const ChipWrapper = styled.div`
    grid-column-start: 2;
    grid-row-start: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: .5rem;
    padding-left: .25rem;
`

const Chip = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 40px;
    border-radius: 5px;
    background-image: linear-gradient(to bottom left, #ffecc7, #d0b978);
    overflow: hidden;
`

const ChipLine = styled.div`
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #333;
    
    &:nth-child(1) {
        top: 13px;
    }
    
    &:nth-child(2) {
        top: 20px;
    }
    
    &:nth-child(3) {
        top: 28px;
    }
    
    &:nth-child(4) {
        left: 25px;
        width: 1px;
        height: 50px;
    }
`

const ChipMain = styled.div`
    width: 20px;
    height: 25px;
    border: 1px solid #333;
    border-radius: 3px;
    background-image: linear-gradient(to bottom left, #efdbab, #e1cb94);
    z-index: 1;
`

const Strip = styled.div`
    background: rgb(0,0,0,.9);
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
`

interface DisplayProps {
    focus?: boolean;
}

const Display = styled.span`
    border: 1px solid;
    border-radius: 6px;
    padding: .25rem;
    transition: border-color 300ms ease;
    border-color: ${(p: DisplayProps) => p.focus ? "orange" : "transparent"};
`