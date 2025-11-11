/* eslint-disable no-undef */
import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import TextareaLines from "./textarea-lines";

describe("TextareaLines", () => {
  it("should render the TextareaLines component", () => {
    const { getByTestId } = render(<TextareaLines />);
    expect(getByTestId("textarea-test-id")).toBeInTheDocument();
  });

  it("should call onChange when value changes", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<TextareaLines onChange={onChange} />);
    fireEvent.change(getByTestId("textarea-test-id"), {
      target: { value: "Hello World" },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("should call onBlur when text area is blurred", () => {
    const onBlur = jest.fn();
    const { getByTestId } = render(<TextareaLines onBlur={onBlur} />);
    fireEvent.blur(getByTestId("textarea-test-id"));
    expect(onBlur).toHaveBeenCalled();
  });

  it("should call onFocus when text area is focused", () => {
    const onFocus = jest.fn();
    const { getByTestId } = render(<TextareaLines onFocus={onFocus} />);
    fireEvent.focus(getByTestId("textarea-test-id"));
    expect(onFocus).toHaveBeenCalled();
  });

  it("should render the line message if lineMessages is given", () => {
    const lineMessages = [
      { line: 1, message: "Line Error", type: "error" },
      { line: 2, message: "Line Warning", type: "warning" },
    ];
    const value = "Hello World\nHello World";
    const { getByTestId } = render(
      <TextareaLines lineMessages={lineMessages} value={value} />,
    );
    expect(getByTestId("line-number")).toBeInTheDocument();
    expect(getByTestId("line-number").children).toHaveLength(
      lineMessages.length,
    );
    lineMessages.forEach((lineMessage, i) => {
      expect(getByTestId("line-number").children[i].firstChild).toHaveClass(
        lineMessage.type,
      );
    });
  });

  it("should render the number of lines based on the value", () => {
    let value = "test\nHello World\nHelo Universe";
    const onChangeMockFn = jest.fn((e) => (value = e.target.value));
    const { getByTestId } = render(
      <TextareaLines onChange={onChangeMockFn} value={value} />,
    );
    expect(getByTestId("line-number")).toBeInTheDocument();
    expect(getByTestId("line-number").children).toHaveLength(3);
  });
});
