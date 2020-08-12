import styled, {css} from "styled-components";

export interface InputWrapperProps {
    error?: boolean;
}

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    ${(p: InputWrapperProps) => p.error && css`
        label, span {
            color: rgba(235, 66, 66, 0.65);
        }

        input {
            background: rgba(235, 66, 66, 0.25);
        }
    `}
`

export default InputWrapper;