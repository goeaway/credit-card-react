import React from "react";
import { render } from "@testing-library/react";
import Card from "@src/components/card";
import "jest-styled-components";

it("should display a placeholder number with *", () => {
    const { getByText } = render(<Card name="" number="" expiry="" security="" focused="" />);
    getByText("**** **** **** ****");
});

it("should display a placeholder expiry with MM/YY", () => {
    const { getByText } = render(<Card name="" number="" expiry="" security="" focused="" />);
    getByText("MM/YY");
});

it("should display the name provided", () => {
    const NAME = "name";
    const { getByText } = render(<Card name={NAME} number="" expiry="" security="" focused="" />);
    getByText(NAME);
});

it("should display a placeholder CVV with *", () => {
    const { getByText } = render(<Card name="" number="" expiry="" security="" focused="" />);
    getByText("***");
});

it("should show card front when showBack is false", () => {
    const { getByRole } = render(<Card name="" number="" expiry="" security="" focused="" />);
    expect(getByRole("card")).not.toHaveStyleRule("transform", "rotateY(180deg)");
});

it("should show card back when focused is security", () => {
    const { getByRole } = render(<Card name="" number="" expiry="" security="" focused="security" />);
    expect(getByRole("card")).toHaveStyleRule("transform", "rotateY(180deg)");
});

it("should combine incomplete long number with *", () => {
    const INCOMPLETE = "1234";
    const { getByText } = render(<Card name="" number={INCOMPLETE} expiry="" security="" focused="" />);
    getByText(INCOMPLETE + " **** **** ****");
});

it("should show complete long number", () => {
    const COMPLETE = "1234 5678 9012 3456";
    const { getByText } = render(<Card name="" number={COMPLETE} expiry="" security="" focused="" />);
    getByText(COMPLETE);
});

it("should combine incomplete expiry with MM/YY", () => {
    const INCOMPLETE = "01";
    const { getByText } = render(<Card name="" number="" expiry={INCOMPLETE} security="" focused="" />);
    getByText(INCOMPLETE + "/YY");
});

it("should show complete expiry", () => {
    const COMPLETE = "01/20";
    const { getByText } = render(<Card name="" number="" expiry={COMPLETE} security="" focused="" />);
    getByText(COMPLETE);
});

it("should combine incomplete CVV with *", () => {
    const INCOMPLETE = "12";
    const { getByText } = render(<Card name="" number="" expiry="" security={INCOMPLETE} focused="" />);
    getByText(INCOMPLETE + "*");
});

it("should show complete CVV", () => {
    const COMPLETE = "123";
    const { getByText } = render(<Card name="" number="" expiry="" security={COMPLETE} focused="" />);
    getByText(COMPLETE);
});