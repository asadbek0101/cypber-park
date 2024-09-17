import { useMemo } from "react";

import { useApiBase } from "../ApiContext";
import { ServicesApi } from "./ServicesApi";

interface Props {
  readonly ServicesApi: ServicesApi;
}

export function useServicesApiContext(): Props {
  const data = useApiBase();

  const api = useMemo(() => new ServicesApi(data), [data]);

  return {
    ServicesApi: api,
  };
}
