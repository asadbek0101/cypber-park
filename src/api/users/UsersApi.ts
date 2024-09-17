import { BaseApi } from "../BaseApi";

export class UsersApi extends BaseApi {
  public getAllUsers(search_value: string) {
    return this.get("users", {
      query: {search_value}
    });
  }

  public getOneUser(id: any) {
    return this.get("Users/GetOneUser/:id", {
      params: {id},
    });
  }

  public getRolesList() {
    return this.get("Users/GetRoleList");
  }

  public createUser(json: any) {
    return this.post("Users/CreateUser", {
      json,
    });
  }

  public updateUser(json: any) {
    return this.put("Users/UpdateUser", {
      json,
    });
  }
}
