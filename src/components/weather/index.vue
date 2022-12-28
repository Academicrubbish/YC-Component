<template>
  <div class="jttq">
    <el-row :gutter="2">
      <el-col :span="11" style="margin: 13px 0">
        <div style="font-size: 20px;font-weight: 600;">{{ cuday + ' ' + cuweek }}</div>
        <div style="line-height: 3; font-size: 15px; font-weight: 400">
          农历{{ lunar(new Date()) }}
        </div>
      </el-col>
      <el-col :span="13">
        <div class="weather">
          <div>
            <el-image :src="require('@/assets/img/xzWeather/' + nowWeather.code + '@1x.png')" fit="fill"
              style="height: 25px"> </el-image>
          </div>
          <div style="font-size:20px;">{{ nowWeather.temperature }}°C</div>
          <div style="font-size:12px;">
            <div>{{ nowWeather.text }}</div>
            <div>{{ weather[0].low }}~{{ weather[0].high }}°C</div>
          </div>
        </div>

        <el-carousel height="30px" indicator-position="none" arrow="never">
          <el-carousel-item v-for="item in weather.length - 1" :key="item">
            <div>
              {{ weather[item].date.slice(-2) }}号
              <el-image :src="require('@/assets/img/xzWeather/' + weather[item].code_day + '@1x.png')" fit="fill"
                style="height: 15px;vertical-align: middle;" />
              {{ weather[item].text_day }} {{ weather[item].low }}~{{ weather[item].high }}°C
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import calendar from "../../utils/calendar";
import WP from "@/utils/date";
import { getNowWeather } from "../../network/weather";
export default {
  data() {
    return {
      nowWeather: {
        code: "0",
        text: "晴",
        temperature: "25"
      },
      weather: [
        {
          date: '2022-11-10',
          text_day: "晴",
          code_day: "0",
          high: "25",
          low: "15"
        },
        {
          date: '2022-11-10',
          text_day: "晴",
          code_day: "0",
          high: "25",
          low: "15"
        },
        {
          date: '2022-11-10',
          text_day: "晴",
          code_day: "0",
          high: "25",
          low: "15"
        }],
      status: 1,
      cuday: "",
      cuweek: "",
    };
  },
  created() {
    /*
    *vip密钥SEVNjZdjmeCgDLHfL

    //获取当天天气状况
    axios({
      url: "https://api.seniverse.com/v3/pro/weather/grid/moment.json?key=SEVNjZdjmeCgDLHfL&location=hangzhou&language=zh-Hans&unit=c&advanced=2.1",
      method: "GET"
    }).then(res => {
      this.nowWeather = res.data.results[0].now;
    })
    //获取未来天气状况
    axios({
      url: "https://api.seniverse.com/v3/weather/daily.json?key=SEVNjZdjmeCgDLHfL&location=hangzhou&language=zh-Hans&unit=c&start=0&days=4",
      method: "GET"
    }).then(res => {
      this.weather = res.data.results[0].daily;
    })

    */

    //获取当天天气状况
    getNowWeather('湖北武汉').then(res => {
      this.nowWeather = res.data.results[0].now;
    })

    //获取未来两天天气状况(包括今天)
    axios({
      url: "https://api.seniverse.com/v3/weather/daily.json?key=SPP1qS4aqhUjiINm7&location=beijing&language=zh-Hans&unit=c&start=0&days=3",
      method: "GET"
    }).then(res => {
      this.weather = res.data.results[0].daily;
      // console.log(res.data.results);
    })

    //获取未来5天生活指数
    axios({
      url: "https://api.seniverse.com/v3/life/suggestion.json?key=SPP1qS4aqhUjiINm7&location=shanghai&language=zh-Hans&days=5",
      method: "GET"
    }).then(res => {
      // console.log(res.data.results);
    })
  },
  mounted() {
    var week = new Date().getDay();
    let weeks = ["日", "一", "二", "三", "四", "五", "六"];
    this.cuweek = "周" + weeks[week];
    this.cuday = WP.dateFormat(new Date(), "MM月DD日");
  },
  methods: {
    lunar(day) {
      let l = calendar.solar2lunar(day.getFullYear(), day.getMonth() + 1, day.getDate())
      let ls = l.IMonthCn + l.IDayCn;
      return ls;
    },
  },
};
</script>

<style scoped>
.weather {
  padding: 5px;
  background-color: rgb(47 121 212 / 55%);
  height: 60px;
  display: flex;
  align-items: center;
  text-align: center;
}

.weather>div {
  flex: 1;
}

.jttq {
  width: 380px;
  font-size: 13px;
}

.el-divider--vertical {
  height: 70px;
  width: 2px;
}

.el-carousel {
  font-size: 12px;
  background-color: rgb(47 121 212 / 55%);
  text-align: center;
  line-height: 30px;
}
</style>
