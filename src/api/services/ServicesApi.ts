import { BaseApi } from "../BaseApi";

export class ServicesApi extends BaseApi {
  public getServicesList() {
    return this.get("Services/GetServicesList");
  }
}
