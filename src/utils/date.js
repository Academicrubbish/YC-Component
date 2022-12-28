import dayjs from "dayjs";
const WP = {
  // 基于dayjs日期格式化,时间戳(毫秒)转日期
  dateFormat(date, format) {
    format = format || "YYYY-MM-DD HH:mm";
    if (!date) return "";
    return dayjs(date).format(format);
  },
};

export default WP;

export function formatDate(dt, fmt = "yyyy-MM-dd hh:mm:ss") {
  if (dt == null) return "";
  const date = new Date(dt);
  const o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
