import { OBJECT_TYPE } from './common-constants';

export const shallowCompare = (object1, object2) => {
  if (typeof object1 === OBJECT_TYPE && typeof object2 === OBJECT_TYPE) {
    const allObjKeys = Object.keys(object1);
    for (const key of allObjKeys) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  } else {
    return object2 === object1;
  }
};
