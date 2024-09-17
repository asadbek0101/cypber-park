import { useMemo } from "react";

import { useApiBase } from "../ApiContext";
import { LogsApi } from "./LogsApi";

interface Props {
  readonly LogsApi: LogsApi;
}

export function useLogsApiContext(): Props {
  const data = useApiBase();

  const api = useMemo(() => new LogsApi(data), [data]);

  return {
    LogsApi: api,
  };
}
