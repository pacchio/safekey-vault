import { useEffect, useState } from 'react';

export const useInitialConfig = () => {
  const [initCompleted, setInitCompleted] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      setInitCompleted(true);
    };
    bootstrapAsync();
  }, []);

  return initCompleted;
};
