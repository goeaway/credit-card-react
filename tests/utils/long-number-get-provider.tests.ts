import { getCardProvider } from "@src/utils/long-number-utils";

it("should recognise a number starting with 4 as a visa number", () => {
    const INPUT = "4111 1111 1111 1111";
    const result = getCardProvider(INPUT);
    expect(result).toBe("visa");
});

it("should recognise a number starting with 51 as mastercard", () => {
    const INPUT = "5111 1111 1111 1111";
    const result = getCardProvider(INPUT);
    expect(result).toBe("mastercard");
});


it("should recognise a number starting with 52 as mastercard", () => {
    const INPUT = "5211 1111 1111 1111";
    const result = getCardProvider(INPUT);
    expect(result).toBe("mastercard");
});


it("should recognise a number starting with 53 as mastercard", () => {
    const INPUT = "5311 1111 1111 1111";
    const result = getCardProvider(INPUT);
    expect(result).toBe("mastercard");
});


it("should recognise a number starting with 54 as mastercard", () => {
    const INPUT = "5411 1111 1111 1111";
    const result = getCardProvider(INPUT);
    expect(result).toBe("mastercard");
});


it("should recognise a number starting with 55 as mastercard", () => {
    const INPUT = "5511 1111 1111 1111";
    const result = getCardProvider(INPUT);
    expect(result).toBe("mastercard");
});

it("should recognise a number starting with 34 as amex", () => {
    const INPUT = "3411 1111 1111 1111";
    const result = getCardProvider(INPUT);
    expect(result).toBe("amex");
});

it("should recognise a number starting with 37 as amex", () => {
    const INPUT = "3711 1111 1111 1111";
    const result = getCardProvider(INPUT);
    expect(result).toBe("amex");
});

it("should return none for an unrecognised number", () => {
    const INPUT = "1111 1111 1111 1111";
    const result = getCardProvider(INPUT);
    expect(result).toBe("none");
});