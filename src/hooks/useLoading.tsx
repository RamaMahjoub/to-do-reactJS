import { useCallback, useState } from "react";

export const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const setLoadingState: () => void = useCallback(() => {
    setLoading((pre) => !pre);
  }, []);

  return { loading, setLoadingState };
};
