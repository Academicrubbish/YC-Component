<template>
  <div class="test">
    <!-- <area-select @areaClick="areaClick"></area-select> -->
    <div class="header">
      <i class="el-icon-location-information"></i>
      {{ location }}
      <button @click="status = true">切换 </button>
    </div>
    <div class="body">
      <div class="body_one">
        <div class="body_img">
          <span>
            <img :src="require('@/assets/img/hfWeather/' + now.icon + '.png')">
          </span>
          <span>
            <div style="font-weight:bold;line-height: 20px;">{{ now.temp }}°</div>
            <div style="font-size:12px;line-height: 20px;">{{ now.text }}</div>
          </span>
        </div>
        <div class="body_text">
          <div class="body_text_label"
            :style="{ 'background-color': nowAir.level == '1' ? '#94CE6F' : nowAir.level == '2' ? '#E4C600' : '#E67249' }">
          </div>
          <div :style="{ 'color': nowAir.level == '1' ? '#94CE6F' : nowAir.level == '2' ? '#E4C600' : '#E67249' }">
            {{ nowAir.category }}
          </div>
        </div>
      </div>
      <div class="body_two">
        <img src="@/assets/img/hfWeather/rain.png">
        {{ summary }}
      </div>
    </div>
    <div class="bottom" v-if="air.length">
      <div v-for="(item, index) in will" :key="index">
        <div>{{ index == 0 ? '今天' : index == 1 ? '明天' : '后天' }}</div>
        <img :src="require('@/assets/img/hfWeather/' + item.iconDay + '.png')">
        <div>{{ item.tempMin }}°/{{ item.tempMax }}°</div>
        <div
          :style="{ 'color': air[index].level == '1' ? '#94CE6F' : air[index].level == '2' ? '#E4C600' : '#E67249' }">
          {{ air[index].category }}
        </div>
      </div>
    </div>
    <div class="pop-up" v-if="status">
      <area-select @areaClick="areaClick"></area-select>
      <!-- <div style="margin: auto;">
        <v-distpicker :province="listData.adm1" :city="listData.adm2" :area="listData.location"
          @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea">
        </v-distpicker>
        <el-button @click="chooseLo">确定</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import areaSelect from "./component/areaSelect.vue";
import VDistpicker from "v-distpicker";
import { getAdm, getLocation, getWeather, getWill, getAir, getNowAir, getMinutely } from "../../network/weather";
export default {
  components: {
    VDistpicker,
    areaSelect
  },
  data() {
    return {
      status: false,
      location: '北京',
      listData: {
        adm1: '北京市',
        adm2: '北京市',
        location: '东城区',  //这个参数名后端返回的和插件定义的不一样
        abcode: '110101'
      },

      getLo: {},
      now: {
        icon: 100
      },
      will: [],
      air: [],
      nowAir: {
        level: 1
      },
      summary: '',
      timer: ''
    }

  },
  methods: {
    areaClick(geoLo) {
      this.listData = geoLo
      this.chooseLo();
    },
    chooseLo() {
      this.location = this.listData.location
      //先根据中国行政编码abcode查询
      getLocation(this.listData.abcode).then(res => {
        //如果使用中国行政编码查询不到 就采用地区查询
        if (res.data.location == null) {
          getAdm({ adm1: this.listData.adm1, adm2: this.listData.adm2, location: this.listData.location }).then(res => {
            // 如果地区查询也查不到 就报错
            if (res.data.location == null) {
              this.$message('暂无此地区信息');
            } else {
              this.saveLo(res)
            }
          })
        }
        else {
          this.saveLo(res)
        }
      })
      this.status = false
    },
    saveLo(res) {
      this.getLo = {
        lat: res.data.location[0].lat,
        lon: res.data.location[0].lon,
        id: res.data.location[0].id
      }
      //将地址信息缓存在浏览器
      let str = JSON.stringify({
        location: this.listData.location,
        getLo: this.getLo,
        listData: this.listData
      })
      localStorage.setItem('location', str);
      this.requestData();
    },
    requestData() {
      //实时天气
      getWeather(this.getLo.id).then(res => {
        if (res.data.code != '200') {
          this.$message('暂无此地区实时天气信息');
        } else {
          this.now = res.data.now;
        }
      })
      //未来三天天气
      getWill(this.getLo.id).then(res => {
        if (res.data.code != '200') {
          this.$message('暂无此地区未来3天天气信息');
        } else {
          this.will = res.data.daily;
        }
      })
      //未来5天天气质量
      getAir(this.getLo.id).then(res => {
        if (res.data.code != '200') {
          this.$message('暂无此地区未来3天天气质量信息');
        } else {
          this.air = res.data.daily
        }
      })
      //当前实时天气质量
      getNowAir(this.getLo.id).then(res => {
        if (res.data.code != '200') {
          this.$message('暂无此地区实时天气质量信息');
        } else {
          this.nowAir = res.data.now
        }
      })
      //分钟级降水
      getMinutely(this.getLo.lon + ',' + this.getLo.lat).then(res => {
        if (res.data.code != '200') {
          this.$message('暂无此地区分钟级降水信息');
        } else {
          this.summary = res.data.summary;
        }
      })
    },
    getData() {
      let str = JSON.parse(localStorage.getItem('location'))
      if (str != null) {
        this.location = str.location
        this.getLo = str.getLo
        this.listData = str.listData
        this.requestData();
      } else {
        this.chooseLo();
      }
    }
  },
  created() {
    this.getData()
    this.timer = setInterval(this.getData, 300000);
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
};
</script>

<style scoped>
.test {
  width: 300px;
  height: 235px;
  padding: 5px;
  box-sizing: border-box;
  background-color: #eff3f7;
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
}

.header {
  font-size: 13px;
}

.header button {
  border: none;
  color: black;
  text-decoration: underline;
  background-color: rgba(0, 0, 0, 0);
}

.body_one {
  height: 60px;
  margin-top: 10px;
  position: relative;
}

.body_one .body_img {
  box-sizing: border-box;
  padding: 3px 0;
}

.body_img>span {
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
}

.body_img img {
  width: 50px;
  height: 50px;
}

.body_one .body_text {
  font-size: 12px;
  position: absolute;
  right: 15px;
  bottom: 20px;
}

.body_one .body_text>div {
  display: inline-block;
  vertical-align: bottom;
}

.body_one .body_text .body_text_label {
  width: 3px;
  height: 14px;
  margin-right: 5px;
}

.body_two {
  margin: 10px 0 10px 0;
  font-size: 12px;
  line-height: 20px;
}

.body_two img {
  width: 20px;
  height: 20px;
  vertical-align: bottom;
}

.bottom {
  display: flex;
  text-align: center;
  border-top: 1px solid #ccc;
  padding-top: 5px;
}

.bottom>div {
  flex: 1;
  font-size: 12px;
}

.bottom img {
  width: 15px;
  height: 15px;
}

.pop-up {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0 0 0 / 50%);
  border-radius: 10px;
}
</style>
