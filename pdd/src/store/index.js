import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //   轮播图数据
    homecasual: [],
    // 首页导航栏数据
    homenav: [],
    // 首页商品列表数据
    homeShopList: [],
    // 推荐商品列表数据
    recommendShopList: [],
    searchgoods: [],
    userInfo: {}, // 用户信息,
    cartGoods: [] // 购物车商品信息

  },
  mutations: {
    Home_Casual(state, homecasual) {
      state.homecasual = homecasual
    },
    Home_Nav(state, homenav) {
      state.homenav = homenav
    },
    Home_Shop_List(state, homeShopList) {
      state.homeShopList = homeShopList
    },
    Recommend_Shop_List(state, recommendShopList) {
      state.recommendShopList = state.recommendShopList.concat(recommendShopList)
    },
    SearchGoods(state, searchgoods) {
      state.searchgoods = searchgoods
    },
    UserInfo(state, userinfo) {
      state.userInfo = userinfo
    },
    ResetUserInfo(state, data) {
      state.userInfo = {}
      console.log(data)
    },
    Cart_Shop(state, cartGoods) {
      state.cartGoods = cartGoods
    },
    // 改变商品数量
    UpdateGoodsCount(state, {
      goods,
      isAdd
    }) {
      if (isAdd) {
        goods.buy_count++
      } else {
        if (goods.buy_count) {
          goods.buy_count--
          if (goods.buy_count === 0) {
            const index = state.cartGoods.indexOf(goods)
            state.cartGoods.splice(index, 1)
          }
        }
      }
    },
    // 是否选中所有商品
    SelectedAll(state, isSelected) {
      state.cartGoods.forEach((goods, index) => {
        if (goods.checked) {
          goods.checked = !isSelected
        } else {
          Vue.set(goods, 'checked', !isSelected)
        }
      })
    },
    // 更改单个商品的选中
    singerGoodsSelected(state, goods) {
      if (goods.checked) {
        goods.checked = !goods.checked
      } else {
        Vue.set(goods, 'checked', true)
      }
    },
    // 单个商品的删除
    delGoodsSinger(state, goods) {
      const index = state.cartGoods.indexOf(goods)
      state.cartGoods.splice(index, 1)
    }
  },
  actions: {
    //   首页轮播图方法
    reqHomeCasual(context) {
      axios.get('api/homecasual').then(({
        data
      }) => {
        context.commit('Home_Casual', data.message)
      })
    },
    // 首页导航方法
    reqHomeNav(context) {
      axios.get('api/homenav').then(({
        data
      }) => {
        context.commit('Home_Nav', data.message.data)
      })
    },
    // 首页列表
    reqHomeShopList(context) {
      axios.get('api/homeshoplist').then(({
        data
      }) => {
        context.commit('Home_Shop_List', data.message.goods_list)
      })
    },
    // 搜索列表
    reqRecommendShopList(context, params) {
      console.log(params)
      const scb = params.scb
      const ecb = params.ecb
      axios.get('http://localhost:8080/pdd_api', {
        params: params
      }).then(({
        data
      }) => {
        context.commit('Recommend_Shop_List', data.message)
        scb && scb(data.data)
      }).catch(() => {
        ecb && ecb('请求数据失败')
      })
    },
    // 推荐列表
    reqSearchGoods(context) {
      axios.get('api/searchgoods').then(({
        data
      }) => {
        context.commit('SearchGoods', data.message.data)
      })
    },
    // 异步获取用户信息
    getUserInfo(context) {
      axios.get('api/user_info').then(({
        data
      }) => {
        context.commit('UserInfo', data.message)
      })
    },
    // 退出登录
    getLogout(context) {
      axios.get('api/logout').then(({
        data
      }) => {
        context.commit('ResetUserInfo', data)
      })
    },
    // 请求购物车商品信息
    reqCartGoods(context) {
      axios.get('api/cart_goods').then(({
        data
      }) => {
        context.commit('Cart_Shop', data.message)
      })
    }
  },
  modules: {},
  getters: {}
})
