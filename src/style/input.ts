import styled from "styled-components";

const Input = styled.input`
    background: #e0e6eb;
    border-radius: 6px;
    padding: .6rem;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    width: 100%;
    padding-left: 35px;
    outline: none;
    border: 1px solid transparent;
    transition: border .3s ease;

    &:focus {
        border: 1px solid rgba(37, 84, 131, 1);
    }
`

export default Input;