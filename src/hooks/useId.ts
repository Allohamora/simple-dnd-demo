import { useMemo } from "react";

export const useId = (prefix: string = "id") => useMemo( () => `${prefix}-${Date.now()}`, [] )