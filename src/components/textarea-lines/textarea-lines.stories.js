import React, { useState } from "react";
import TextareaLines from "./textarea-lines";

export default {
  title: "design-components/TextareaLines",
  component: TextareaLines,
};

export const Default = () => {
  const [value, setValue] = useState(
    "A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.\nA paragraph consists of one or more sentences.\n Though not required by the syntax of any language,\nparagraphs are usually an expected part of formal writing.",
  );
  const onChangeHandler = (e) => {
    const { value } = e.target;
    console.log(value);
    setValue(value);
  };
  const props = {
    label: "Label",
    helperText: "Sub Label",
    value: value,
    placeholder: "Placeholder...",
    width: "600px",
    height: "400px",
    onChange: onChangeHandler,
  };
  return <TextareaLines {...props} />;
};

export const Readonly = () => {
  const [value, setValue] = useState(
    "A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing.",
  );

  const onChangeHandler = (e) => {
    const { value } = e.target;
    console.log(value);
    setValue(value);
  };
  const props = {
    label: "Label",
    helperText: "Sub Label",
    value: value,
    placeholder: "Placeholder...",
    width: "600px",
    height: "400px",
    variant: "naked",
    readOnly: true,
    onChange: onChangeHandler,
  };
  return <TextareaLines {...props} />;
};

export const Error = () => {
  const [value, setValue] = useState("");

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
  };
  const props = {
    label: "Label",
    helperText: "Sub Label",
    type: "text",
    value: value,
    placeholder: "Placeholder...",
    error: true,
    errorMsg: "Error Message Here",
    width: "600px",
    height: "400px",
    onChange: onChangeHandler,
  };
  return <TextareaLines {...props} />;
};

export const LineMessages = () => {
  const [value, setValue] = useState(
    "A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.\nA paragraph consists of one or more sentences.\n Though not required by the syntax of any language,\nparagraphs are usually an expected part of formal writing.",
  );

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
  };
  const props = {
    label: "Label",
    helperText: "Sub Label",
    type: "text",
    value: value,
    placeholder: "Placeholder...",
    width: "600px",
    height: "400px",
    onChange: onChangeHandler,
    lineMessages: [
      {
        line: 1,
        message:
          " undeclared reference to 'a-expression' (in container '')\n | expression\n | ^",
        type: "error",
      },
      {
        line: 4,
        message: ` undeclared reference to 'expression' (in container '')
        | add
        | ^`,
        type: "warning",
      },
    ],
  };
  return <TextareaLines {...props} />;
};

export const Disabled = () => {
  const [value, setValue] = useState(
    "A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.",
  );

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
  };
  const props = {
    label: "Label",
    helperText: "Sub Label",
    type: "text",
    value: value,
    placeholder: "Placeholder...",
    width: "300px",
    height: "104px",
    disabled: true,
    onChange: onChangeHandler,
  };
  return <TextareaLines {...props} />;
};

export const OnBlur = () => {
  const [blurLable, setBlurLabel] = useState("");
  const [value, setValue] = useState("");

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setValue(value);
    setBlurLabel("");
  };

  const onBlurHandler = () => {
    setBlurLabel("Triggered because this input lost focus");
  };
  const onFocusHandler = () => {
    setBlurLabel("");
  };

  return (
    <>
      <TextareaLines
        label="Enter Name"
        name="name"
        type="text"
        value={value}
        width="400px"
        placeholder="Enter vault name"
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
      />
      <label>{blurLable && blurLable}</label>
    </>
  );
};
