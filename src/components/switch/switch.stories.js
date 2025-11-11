import { useState } from "react";
import Switch from "./switch";

export default {
  title: "design-components/Switch",
  component: Switch,
};

export const Default = () => {
  const [checked, setIsChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onToggle={() => setIsChecked((checked) => !checked)}
    />
  );
};

export const WithLabel = () => {
  const [checked, setIsChecked] = useState(false);

  const label = {
    true: "On",
    false: "Off",
  };

  return (
    <Switch
      checked={checked}
      onToggle={(checked) => setIsChecked(!checked)}
      label={label[checked]}
    />
  );
};

export const Disabled = () => {
  return <Switch checked={false} disabled label='Off' />;
};

export const ErrorMessage = () => {
  const [checked, setIsChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onToggle={() => setIsChecked((checked) => !checked)}
      error
      width={240}
      errorMessage='Something went wrong! Please try again after sometime.'
    />
  );
};
