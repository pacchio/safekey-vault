import React, { useState, useRef } from 'react';

type HookRes = [
  string,
  string[],
  (index: number, value: string) => void,
  React.MutableRefObject<any>[],
  React.Dispatch<React.SetStateAction<string[]>>,
];

export const usePasscodeInput = (passcodeLength = 5): HookRes => {
  const passcodeArray = Array.from(new Array(passcodeLength), () => '');
  const passcodeInputRefs = Array.from(new Array(passcodeLength), () => useRef(null));
  const [passcodeFields, setPasscode] = useState(passcodeArray);
  const setPasscodeItem = (index: number, value: string) => {
    const array = [...passcodeFields];
    if (value.length > 0) {
      value.split('').map((c, i) => {
        if (index + i < array.length) array.splice(index + i, 1, c);
      });
    } else {
      array.splice(index, 1, value);
    }
    setPasscode(array);
  };
  return [passcodeFields.join(''), passcodeFields, setPasscodeItem, passcodeInputRefs, setPasscode];
};
