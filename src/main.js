import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
// 引入和风天气图标
import "qweather-icons/font/qweather-icons.css";

//vue-awesome-swiper轮播图组件
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";

Vue.use(VueAwesomeSwiper /* { 全局组件的默认选项 } */);

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
