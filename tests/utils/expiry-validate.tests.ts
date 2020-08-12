import { validateExpiry } from "@src/utils/expiry-validate";

it("should return true for 01/01 when current date is 01/01/01", () => {
    const result = validateExpiry("01/01", new Date(2001, 0, 1));
    expect(result).toBe(true);
});

it("should return false for 01/01 when current date is 01/02/01", () => {
    const result = validateExpiry("01/01", new Date(2001, 1, 1));
    expect(result).toBe(false);
});

it("should return false for aa/01 when current date is 01/01/01", () => {
    const result = validateExpiry("aa/01", new Date(2001, 0, 1));
    expect(result).toBe(false);
});

it("should return false for asadsfas when current date is 01/01/01", () => {
    const result = validateExpiry("asadsfas", new Date(2001, 0, 1));
    expect(result).toBe(false);
});