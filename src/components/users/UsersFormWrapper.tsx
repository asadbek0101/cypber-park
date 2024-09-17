import { useCallback, useEffect, useMemo, useState } from "react";
import { UserFilter, UserFilterTabs } from "../../filters/UserFIlter";
import { useServicesApiContext } from "../../api/services/ServicesApiContext";
import { useUsersContext } from "../../api/users/UsersContext";
import { showError } from "../../utils/NotificationUtils";
import { UserInitialProps } from "../../api/users/UsersDto";
import { toast } from "react-toastify";

import TabPage from "../tabs/TabPage";
import UsersForm from "./UsersForm";
import Button, { BgColors } from "../ui/Button";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: UserFilter;
}

export default function UsersFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<UserInitialProps>({
    id: 0,
    name_of_compony: "",
    email: "",
    password: "",
    username: "",
  });

  const [services, setServices] = useState([]);

  const { UsersApi } = useUsersContext();
  const { ServicesApi } = useServicesApiContext();

  const locationHelpers = useLocationHelpers();

  const userId = useMemo(() => filter.getUserId() || 0, [filter]);

  useEffect(() => {
    ServicesApi.getServicesList()
      .then((r) => {
        const array = r?.data?.map((item: any) => {
          return {
            label: item?.name,
            value: item?.id,
          };
        });
        setServices(array);
      })
      .catch(showError);
  }, [ServicesApi]);

  useEffect(() => {
    if (Boolean(userId)) {
      UsersApi.getOneUser(userId)
        .then((r) => {
          const json = {
            ...r?.data,
            role: {
              label: r?.data?.roleName,
              value: r?.data?.roleValue,
            },
          };

          setInitialValues(json);
        })
        .catch(showError);
    }
  }, [UsersApi, userId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (Boolean(userId)) {
        const json = {
          id: userId,
          ...value,
        };

        UsersApi.updateUser(json)
          .then((r) => {
            if (r?.isError && !r?.isSuccess) {
              toast.error(r?.message);
            } else {
              toast.success(r?.message);
              locationHelpers.pushQuery({ tab: UserFilterTabs.UserTable });
            }
          })
          .catch(showError);
      } else {
        const json = {
          ...value,
        };

        UsersApi.createUser(json)
          .then((r) => {
            if (r?.isError && !r?.isSuccess) {
              toast.error(r?.message);
            } else {
              toast.success(r?.message);
              locationHelpers.pushQuery({ tab: UserFilterTabs.UserTable });
            }
          })
          .catch(showError);
      }
    },
    [UsersApi, userId, locationHelpers],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between align-items-center">
          <Button
            className="px-3 py-2 text-light"
            bgColor={BgColors.Green}
            onClick={() => locationHelpers.pushQuery({ tab: UserFilterTabs.UserTable })}
          >
            Orqaga
          </Button>
        </div>
      }
    >
      <UsersForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
        services={services}
      />
    </TabPage>
  );
}
