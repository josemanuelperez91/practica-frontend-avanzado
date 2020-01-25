export default class cookieManager {
  static getCookie = name => {
    const cookie = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return cookie ? cookie[2] : null;
  };

  static setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = `${name}=${value};path=/;expires=${date.toGMTString()}`;
  };

  static deleteCookie = name => {
    this.setCookie(name, "", -1);
  };
}
