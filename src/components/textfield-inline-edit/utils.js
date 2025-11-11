import { inlineEditClasses, rawTextClasses } from "./constants"

export const getInputContainerClass = (readOnly) => {
  if (readOnly) {
    return inlineEditClasses.inputContainerReadOnly
  }

  return rawTextClasses.inputContainer
}

export const getNakedVariantClass = (value, placeholder, error) => {
  if (error) {
    return inlineEditClasses.variantNakedError
  }

  if (!value && !placeholder) {
    return inlineEditClasses.variantNakedEmpty
  }

  return rawTextClasses.variantNaked
}