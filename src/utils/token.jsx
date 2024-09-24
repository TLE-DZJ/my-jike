// 封装和token相关的方法 存 取 删
const TOKENKEY = 'token_key'

// 增加
function setToken (token) {
  return localStorage.setItem(TOKENKEY, token)
}

// 读取
function getToken () {
  return localStorage.getItem(TOKENKEY)
}

// 清除
function removeToken () {
  return localStorage.removeItem(TOKENKEY)
}

export {
  setToken,
  getToken,
  removeToken
}