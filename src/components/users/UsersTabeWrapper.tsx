import { useCallback, useEffect, useState } from "react";
import { useUsersContext } from "../../api/users/UsersContext";
import { UserFilter, UserFilterTabs } from "../../filters/UserFIlter";
import { showError } from "../../utils/NotificationUtils";
import { Form, Formik } from "formik";
import { noop } from "lodash";
import { InputField } from "../form/InputField";

import TabPage from "../tabs/TabPage";
import UsersTable from "./UsersTable";
import Button, { BgColors } from "../ui/Button";
import Paginator from "../paginator/Paginator";
import DeleteIcon from "../icons/DeleteIcon";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import Modal from "../ui/Modal";
import LogsTableWrapper from "../logs/LogsTableWrapper";
import { GroupBox } from "../ui/GroupBox";

interface Props {
  readonly filter: UserFilter;
}

export default function UsersTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>({});
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [logModal, setLogModal] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const { UsersApi } = useUsersContext();

  const locationHelpers = useLocationHelpers();

  useEffect(() => {
    setLoading(true)
    UsersApi.getAllUsers(searchValue)
      .then((r) => {
        setData({ data: r });
        setLoading(false)
      })
      .catch((error) => console.log(error));
  }, [UsersApi, searchValue]);


  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between align-items-center">
          <Button
            className="px-3 py-2 text-light"
            bgColor={BgColors.Green}
            onClick={() =>
              locationHelpers.pushQuery({ tab: UserFilterTabs.UserForm, userId: null })
            }
          >
            Qo'shish
          </Button>
          <Formik
            initialValues={{
              searchValue: searchValue,
            }}
            onSubmit={noop}
            enableReinitialize={true}
          >
            {() => (
              <Form className="d-flex gap-3 align-items-center">
                <InputField
                  name="searchValue"
                  width={300}
                  placeholder="Qidirish..."
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </Form>
            )}
          </Formik>
        </div>
      }
      footerComponent={
        <div className="d-flex justify-content-between align-items-center mt-4 pb-3">
          <Button
            disabled={!(deleteDocuments && deleteDocuments?.length > 0)}
            onClick={() => setDeleteModal(true)}
            className="py-2 px-2 text-light"
            bgColor={deleteDocuments && deleteDocuments?.length > 0 ? BgColors.Red : BgColors.White}
          >
            <DeleteIcon color={deleteDocuments && deleteDocuments?.length > 0 ? "#fff" : "#000"} />
          </Button>
          <Paginator
            filter={filter}
            totalPageCount={data?.totalPageCount}
            totalRowCount={data?.data?.total}
          />
        </div>
      }
    >
      <UsersTable
        data={data?.data?.users}
        loading={loading}
        edit={(value) => locationHelpers.pushQuery({ tab: UserFilterTabs.UserForm, userId: value })}
        getLog={(value) => {
          setLogModal(true);
          locationHelpers.pushQuery({ userId: value });
        }}
      />
      <Modal
        show={logModal}
        width="900px"
        closeHandler={() => setLogModal(false)}
        className="d-flex justify-content-center align-items-center p-3"
      >
        <GroupBox>
          <LogsTableWrapper filter={filter} />
        </GroupBox>
      </Modal>
    </TabPage>
  );
}
