import { BaseApi } from "../BaseApi";

export class LogsApi extends BaseApi {
  public getAllLogs(userId: any) {
    return this.get("Logs/GetAllLogs/:userId", {
      params: { userId },
    });
  }
}
