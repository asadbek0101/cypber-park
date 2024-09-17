import { useEffect, useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useShallowEqualSelector } from "../hooks/useShallowSelector";
import { profileSelector, tokenSelector } from "../reducers/authReducer";
import { CheckRole } from "../utils/CheckRole";
import { UserRoles } from "../api/AppDto";

import AppContainer from "./AppContainer";
import UsersContainer from "./UsersContainer";
import AuthContainer from "./AuthContainer";
import NotFoundContainer from "./NotFoundContainer";

export default function RootContainer() {
  const token = useShallowEqualSelector(tokenSelector);
  const profile = useShallowEqualSelector(profileSelector);

  // const isAuthorized = useMemo(() => Boolean(token), [token]);

  const isAuthorized = true

  const locatonPath = useLocation().pathname;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized || locatonPath === "/") {
      navigate("auth");
    }
    if (isAuthorized && locatonPath === "/") {
      navigate("/dashboard/objects");
    }
  }, [isAuthorized, navigate, locatonPath]);

  return (
    <Routes>
      {isAuthorized && (
        <Route path="/dashboard" element={<AppContainer />}>
          {!CheckRole(UserRoles.Programmer, profile) && (
            <Route path="users/:tab?" element={<UsersContainer />} />
          )}
          <Route path="*" element={<NotFoundContainer />} />
        </Route>
      )}
      <Route path="/auth" element={<AuthContainer />} />
    </Routes>
  );
}
