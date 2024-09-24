// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit"
import { request } from "@/utils"

const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    // token由后端接口返回的数据类型决定，这里后端返回一个字符串
    // 判断本地存储是否有，有就直接用
    token: localStorage.getItem('token_key') || ''
  },
  // 同步修改方法
  reducers: {
    // action为修改的描述对象
    setToken(state, action) {
      state.token = action.payload

      // token持久化，localstorage存一份
      localStorage.setItem('token_key', action.payload)
    }
  }
})

// 解构出actionCreater

const { setToken } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer


// 异步方法 完成登录获取token
// 参数为表单收集到的表单数据
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1 发送异步请求
    const res = await request.post('/authorizations', loginForm)

    // 2 提交同步action进行token的存入
    // 执行setToken()得到一个action对象，并将后端返回的数据作为action对象的实参
    // 这样可以将token存入useStore里面的token
    dispatch(setToken(res.data.token))

  }
}


export { fetchLogin, setToken }
export default userReducer