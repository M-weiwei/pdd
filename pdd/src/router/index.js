import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../pages/Home/Home.vue'
import Recommend from '../pages/Recommend/Recommend.vue'
import Me from '../pages/Me/Me.vue'
import Chat from '../pages/Chat/Chat.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
// 首页板块二级路由
import Box from '../pages/Home/Children/Box.vue'
import Dress from '../pages/Home/Children/Dress.vue'
import Ele from '../pages/Home/Children/Ele.vue'
import Food from '../pages/Home/Children/Food.vue'
import General from '../pages/Home/Children/General.vue'
import Hot from '../pages/Home/Children/Hot.vue'
import Mbaby from '../pages/Home/Children/Mbaby.vue'
import Shirt from '../pages/Home/Children/Shirt.vue'
import Man from '../pages/Home/Children/Man.vue'
import MeSetting from '../pages/Me/MeSetting.vue'
import Medetail from '../pages/Me/MeDetail.vue'
// 路由懒加载
const Home = () => import('../pages/Home/Home.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/home',
  component: Home,
  children: [{
      path: 'box',
      component: Box
    },
    {
      path: 'dress',
      component: Dress
    },
    {
      path: 'ele',
      component: Ele
    },
    {
      path: 'food',
      component: Food
    },
    {
      path: 'general',
      component: General
    },
    {
      path: 'hot',
      component: Hot,
      meta: {
        showBottomTabBar: true
      }
    },
    {
      path: 'mbaby',
      component: Mbaby
    },
    {
      path: 'shirt',
      component: Shirt
    }, {
      path: 'man',
      component: Man
    }, {
      path: '/home',
      redirect: '/home/hot'
    }
  ],
  meta: {
    showBottomTabBar: true
  } // 控制底部导航显示或隐藏
}, {
  path: '/recommend',
  component: Recommend,
  meta: {
    showBottomTabBar: true
  }
}, {
  path: '/me',
  component: Me,
  meta: {
    showBottomTabBar: true
  }
}, {
  path: '/chat',
  component: Chat,
  meta: {
    showBottomTabBar: true
  }
}, {
  path: '/search',
  component: Search,
  meta: {
    showBottomTabBar: true
  }
}, {
  path: '/',
  redirect: '/home'
}, {
  path: '/Login',
  component: Login
}, {
  path: '/setting',
  component: MeSetting
}, {
  path: '/detail',
  component: Medetail
}]

const router = new VueRouter({
  routes
})

export default router
