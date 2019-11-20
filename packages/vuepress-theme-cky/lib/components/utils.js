export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^(https?:|mailto:|tel:)/

export function normalize (path) {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

export function isExternal (path) {
  return outboundRE.test(path)
}

export function isMailto (path) {
  return /^mailto:/.test(path)
}

export function isTel (path) {
  return /^tel:/.test(path)
}

export function ensureExt (path) {
  if (isExternal(path)) {
    return path
  }
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  const normalized = normalize(path)

  if (endingSlashRE.test(normalized)) {
    return path
  }
  return normalized + '.html' + hash
}

/*
 * find parent vm by ref
 * @param {String} ref
 * @param {Vue} vm
 * @param {any} def default value
 * @returns {Element}
 */
export function findContainerInVm(ref, vm, def) {
  if (!ref) return def;
  let container;
  let parent = vm;
  while ((parent = parent.$parent) && !container) {
    container = parent.$refs[ref];
  }
  // Ensure it's html element (ref could be component)
  if (container && container.$el) {
    container = container.$el;
  }
  return container || def;
}
const MONTH_MAP = {
  1: '一月',
  2: '二月',
  3: '三月',
  4: '四月',
  5: '五月',
  6: '六月',
  7: '七月',
  8: '八月',
  9: '九月',
  10: '十月',
  11: '十一月',
  12: '十二月'
}

// return 九月 17, 2019
export function dateFormatter(time) {
  if (!time) return ''
  const date = new Date(time)
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const day = date.getDate()

  function pad(val) {
    return val > 9 ? val : `0${val}`
  }
  return `${MONTH_MAP[month]} ${pad(day)}, ${year}`
}