import Layout  from '@/pages/Layout'
import Login  from '@/pages/Login'

import { createBrowserRouter } from 'react-router-dom'

import AuthRoute from '@/components/AuthRoute'

import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'


// 配置路由实例

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute> <Layout /> </AuthRoute>,
    // 二级路由为Layout下面的子路由
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'article',
        element: <Article />
      },
      {
        path: 'publish',
        element: <Publish />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
])

export default router