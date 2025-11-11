import { inlineEditClasses, rawTextClasses } from "./constants"
import { getInputContainerClass, getNakedVariantClass } from "./utils"

describe('Textfield inline edit utils tests.', () => {
  describe('getInputContainerClass tests', () => {
    it('should return the read only container class when the readOnly is true', () => {
      expect(getInputContainerClass(true)).toEqual(inlineEditClasses.inputContainerReadOnly)
    })
  
    it('should return the default container class when the readOnly is false', () => {
      expect(getInputContainerClass(false)).toEqual(rawTextClasses.inputContainer)
    })
  })
  
  describe('getNakedVariantClass tests', () => {
    const dummyValue = 'test'
    const dummyPlaceholder = 'placeholder'
  
    it('should return the error variant class when the error is true', () => {
      expect(getNakedVariantClass(dummyValue, dummyPlaceholder, true)).toEqual(inlineEditClasses.variantNakedError)
    })
  
    it('should return the empty variant class when the value and placeholder is empty', () => {
      expect(getNakedVariantClass('', '', false)).toEqual(inlineEditClasses.variantNakedEmpty)
    })
  
    it('should return the empty variant class when the value and placeholder is null', () => {
      expect(getNakedVariantClass(null, null, false)).toEqual(inlineEditClasses.variantNakedEmpty)
    })
  
    it('should return the default variant class when only the value is not present', () => {
      expect(getNakedVariantClass(null, dummyPlaceholder, false)).toEqual(rawTextClasses.variantNaked)
    })
  
    it('should return the default variant class when only the placeholder is not present', () => {
      expect(getNakedVariantClass(dummyValue, null, false)).toEqual(rawTextClasses.variantNaked)
    })
  
    it('should return the default variant class when the value, and the placeholder are present', () => {
      expect(getNakedVariantClass(dummyValue, dummyPlaceholder, false)).toEqual(rawTextClasses.variantNaked)
    })
  })
})
