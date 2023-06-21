<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="@/assets/img/swiper/1.jpg">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="@/assets/img/swiper/2.jpg">
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="@/assets/img/swiper/1.jpg">
      </div>
    </swiper-slide>
    <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'swiper-example-zoom',
  title: 'Zoom',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        zoom: true,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style scoped>
.swiper {
  height: 400px;
}

.swiper-slide {
  background: #444;
}
</style>
