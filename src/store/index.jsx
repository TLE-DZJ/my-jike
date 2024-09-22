// 组合Redux的子模块 + 导出store实例

import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./modules/user"

// 该方法返回一个store实例对象
export default configureStore({
  reducer:{
    user: userReducer
  }
})