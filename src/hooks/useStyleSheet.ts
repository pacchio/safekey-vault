import { useMemo } from 'react';

export const useStyleSheet = (styleFunction: any) => {
  const dynamicStyles = useMemo(() => styleFunction, [styleFunction]);

  return dynamicStyles;
};
