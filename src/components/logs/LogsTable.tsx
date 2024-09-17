import { noop } from "lodash";
import { useMemo } from "react";
import Table from "../table/Table";

interface Props {
  readonly data: any[];
}

export default function LogsTable({ data = [] }: Props) {
  const column = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
        width: 100,
      },
      {
        Header: "Murojat qilingan api address",
        accessor: "last_request_ip_address",
        width: 300,
      },
      {
        Header: "Murojat qilingan vaqti",
        accessor: "last_request_date",
        width: 300,
      },
      {
        Header: "Murajoat statusi",
        accessor: "request_status",
        width: 200,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <Table columns={column} data={data} selectRowCheckbox={noop} />;
}
