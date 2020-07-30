// email
export function isNumber(item) {
  const numberReg = /^[0-9]+(\.[0-9]{1,2})?$/;
  return numberReg.test(item.trim());
}

// email
export function isEmail(item) {
  const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return emailReg.test(item.trim());
}

// molbile
export function isPhone(item) {
  const phoneReg = /^1[3456789]\d{9}$/;
  return phoneReg.test(item.trim());
}

// tel
export function isTel(item) {
  const telReg = /^\d{3,4}(-|\s)?\d{3,4}(-|\s)?\d{3,4}$/;
  return telReg.test(item.trim());
}

// tel area
export function isTelArea(item) {
  const telReg = /^\d{3,4}$/;
  return telReg.test(item.trim());
}

// tel NO
export function isTelNO(item) {
  const telReg = /^\d{7,8}$/;
  return telReg.test(item.trim());
}

// fax
export function isFax(item) {
  const faxReg = /^(\d{3,4}-)?\d{7,8}$/;
  return faxReg.test(item.trim());
}

// uri
export function isUrl(item) {
  const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return urlReg.test(item.trim());
}

// image
export function isImg(item) {
  const imgReg = /\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
  return imgReg.test(item);
}

// accept file
export function isAcceptFile(item) {
  const fileReg = /\.(jpg|jpeg|png|pdf|doc|docx|xls|xlsx|ppt|pptx)$/;
  return fileReg.test(item);
}

// excel file
export function isExcelFile(item) {
  const fileReg = /\.(xls|xlsx)$/;
  return fileReg.test(item);
}

//验证QQ号码5-11位
export function isQQ(qq) {
  var qqReg = /^\s*[.0-9]{5,11}\s*$/;
  return qqReg.test(qq);
}

// 英文+数字最大20位
export function isAccount(acc) {
  const accReg = /^[a-zA-Z][a-zA-Z0-9_]{1,20}$/;
  return accReg.test(acc);
}

// 英文，数字，字符 6-20位
export function isPassword(pwd) {
  const pwdReg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
  return pwdReg.test(pwd);
}
