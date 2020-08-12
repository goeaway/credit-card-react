import { validate } from "@src/utils/long-number-utils";

it("should return true for multiple different numbers that are correct", () => {
    const numbers = [
         "4111111111111111"
        ,"4751300182884301"
        ,"4532683572899732"
        ,"4916977827336615"
        ,"4556735528158917293"
        ,"2720992330541833"
        ,"5228757464885581"
        ,"2221004487715931"
        ,"373078811686679"
        ,"372224232259222"
        ,"373875221987153"
        ,"6011376831713696"
        ,"6011208936720062"
        ,"6011116207871367184"
        ,"3544931327661610"
        ,"3541770971890999"
        ,"3589463289552662197"
        ,"5464464005232695"
        ,"5430865000673249"
        ,"5407026003567743"
        ,"30453710521670"
        ,"30482686033568"
        ,"30047696771802"
        ,"36208136737894"
        ,"36946915974606"
        ,"36454800137587"
        ,"0604983761031142"
        ,"6762672884833220"
        ,"5018886266860148"
        ,"4508519387586512"
        ,"4913444115244202"
        ,"4917355134780537"
        ,"6372467516543582"
        ,"6377912168503504"
        ,"6395407775864223"
    ];

    const failed = [];

    numbers.forEach(n => {
        const result = validate(n);

        if(!result) {
            failed.push(n);
        }
    });

    if(failed.length > 0) {
        fail(failed.join(", ") + " failed");
    }
});

it("should return false for a number that has an incorrect sum", () => {
    const value = "4751300182883301";
    const result = validate(value);
    expect(result).toBe(false);
});

it("should return false for a number that has an incorrect check digit", () => {
    const value = "4751300182884302";
    const result = validate(value);
    expect(result).toBe(false);
});

it("should return false for a number that is shorter than 13 digits", () => {
    const value = "123456789012";
    const result = validate(value);
    expect(result).toBe(false);
});

it("should return false for a number that is longer than 19 digits", () => {
    const value = "47513001828843012345";
    const result = validate(value);
    expect(result).toBe(false);
});

it("should return false for a number that is undefined", () => {
    const value = undefined;
    const result = validate(value);
    expect(result).toBe(false);
});

it("should return false for a number that is null", () => {
    const value = null;
    const result = validate(value);
    expect(result).toBe(false);
});

it("should return false for a number that is empty", () => {
    const value = "";
    const result = validate(value);
    expect(result).toBe(false);
});

it("should return false if at least one digit in the string is NaN", () => {
    const value = "47513001828843a1";
    const result = validate(value);
    expect(result).toBe(false);
});