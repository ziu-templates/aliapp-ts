/**
 * 全局
 */
import { updateApp } from "miniapp-utils";

class AppOption implements IMippAliApp.ILifetime {
  static getApp(): AppOption {
    return getApp<AppOption>();
  }

  private globalData = null;

  onLaunch(opts: IMippAliApp.ILaunchOption): void {
    console.log("onLaunch: ", opts);
  }

  onShow(): void {
    updateApp();
  }

  onError(msg: string): void {
    console.log("onError: ", msg);
  }
}

export default AppOption;

App(new AppOption());