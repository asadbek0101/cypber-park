import { noop } from "lodash";
import { useMemo } from "react";
import { toast } from "react-toastify";

import Table from "../table/Table";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";

interface Props {
  readonly data: any[];
  readonly loading: boolean;
  readonly edit: (value: any) => void;
  readonly getLog: (value: any) => void;
}

export default function UsersTable({ data = [], edit, getLog, loading }: Props) {
  const handleCopy = (text: string) => {
    toast.success("Copied");
    navigator.clipboard.writeText(text);
  };

  const column = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        width: 80,
        Cell: (row: any) => {
          return <img width="100%" height="100%" src={`${row?.row?.original?.image}`}/>
        }
      },
      {
        Header: "Id",
        accessor: "id",
        width: 100,
      },
      {
        Header: "Full Name",
        accessor: "fullname",
        width: 240,
        Cell: (row: any) => {
          return <span>{row.row.original.firstName + " " + row.row.original.lastName + " "+ row.row.original.maidenName}</span>
        }
      },{
        Header: "E-pochta",
        accessor: "email",
        width: 300,
      },
      {
        Header: "University",
        accessor: "university",
        width: 300,
      },
      {
        Header: "Username",
        accessor: "username",
        width: 240,
      },
      {
        Header: "Role",
        accessor: "role",
        width: 140,
      },
      {
        Header: "User Agent",
        accessor: "userAgent",
        width: 400,
      },
      {
        Header: "...",
        accessor: "actions",
        width: 100,
        Cell: (row: any) => {
          return (
            <div className="d-flex justify-content-center gap-2">
              <Button
                className="text-light p-2"
                bgColor={BgColors.Yellow}
                onClick={() => edit(row?.row?.original?.id)}
              >
                <PencilIcon />
              </Button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <Table columns={column} data={data} selectRowCheckbox={noop} loading={loading} />;
}
