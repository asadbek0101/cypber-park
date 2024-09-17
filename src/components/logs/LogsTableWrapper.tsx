import { useEffect, useMemo, useState } from "react";
import { useLogsApiContext } from "../../api/logs/LogsApiContext";
import { UserFilter } from "../../filters/UserFIlter";

import LogsTable from "./LogsTable";

interface Props {
  readonly filter: UserFilter;
}

export default function LogsTableWrapper({ filter }: Props) {
  const { LogsApi } = useLogsApiContext();
  const [data, setData] = useState([]);

  const userId = useMemo(() => filter.getUserId() || 0, [filter]);

  useEffect(() => {
    LogsApi.getAllLogs(userId)
      .then((r) => setData(r?.data))
      .catch((er) => console.log(er));
  }, [LogsApi, userId]);

  return <LogsTable data={data} />;
}
