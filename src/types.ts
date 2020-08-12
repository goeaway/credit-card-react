export interface InputProps {
    onValueChanged: (info: ValueValid) => void;
    info?: ValueValid;
    showErrors?: boolean;
    onFocusChanged: (focused: boolean) => void;
}

export interface ValueValid {
    value: string;
    valid: boolean;
    reason: string;
}

export interface Rect {
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
}