import "./assets/sidebar-menu.scss";
import { useI18n } from "../../i18n/I18nContext";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { Profile, profileSelector } from "../../reducers/authReducer";
import { appMenuTypeSelector } from "../../reducers/appReducer";
import { AppMenuType, UserRoles } from "../../api/AppDto";
import { CheckRole } from "../../utils/CheckRole";
import { useNavigate } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import UsersIcon from "../icons/UsersIcon";

export default function SidebarMenu() {
  const { translate } = useI18n();

  const profile: Profile | undefined = useShallowEqualSelector(profileSelector);

  const menu = useShallowEqualSelector(appMenuTypeSelector);

  const navigate = useNavigate();

  return (
    <div className="sidebar-menu">
      <div className="sidebar-menu-header">
        {menu === AppMenuType.Opened && (
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard/statistic")}
          >
            {profile?.RoleName}
          </span>
        )}
      </div>
      <div className="sidebar-menu-menu">
        {!CheckRole(UserRoles.Programmer, profile) && (
          <SidebarItem link="users" icon={<UsersIcon />}>
            {translate("Foydalanuvchilar")}
          </SidebarItem>
        )}
      </div>
    </div>
  );
}
