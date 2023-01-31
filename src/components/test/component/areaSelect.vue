<template>
  <div class="area_select">
    <span>
      <el-select size="mini" v-model="province" placeholder="请选择省" @change="selectProvince">
        <el-option v-for="item in provinceList" :key="item.code" :label="item.value" :value="item">
        </el-option>
      </el-select>
      <el-select size="mini" v-model="city" placeholder="请选择市" @change="selectCity">
        <el-option v-for="item in cityList" :key="item.code" :label="item.value" :value="item">
        </el-option>
      </el-select>
      <el-select size="mini" v-model="districts" placeholder="请选择区" @change="selectDistricts">
        <el-option v-for="item in districtsList" :key="item.code" :label="item.value" :value="item">
        </el-option>
      </el-select>
      <el-button size="mini" @click="submit">确定</el-button>
    </span>
  </div>
</template>

<script>
import DEFAULT_AREA from '@/utils/area'
export default {
  data() {
    return {
      province: {},
      provinceList: [],
      city: {},
      cityList: [],
      districts: {},
      districtsList: [],
      sourceCity: [],
      sourceDistricts: [],
      geoLo: {
        adm1: '',
        adm2: '',
        location: '',
        abcode: ''
      },
    };
  },
  mounted() {
    this.provinceList = this.obj2arr(DEFAULT_AREA.province)
    this.sourceCity = this.obj2arr(DEFAULT_AREA.city);
    this.sourceDistricts = this.obj2arr(DEFAULT_AREA.districts);

  },
  methods: {
    selectProvince(obj) {
      // 存下当前选中的省份
      this.geoLo.adm1 = obj.value
      // 选中其他省份时 清除之前选中的市级和县(区)级
      this.city = {};
      this.districts = {};
      // 遍历找到该省级单位下辖的市级单位 并转化为数组
      this.sourceCity.forEach(item => {
        if (this.province.code == item.code) {
          this.cityList = this.obj2arr(item.value)
        }
      })
      // 选中省份时默认选中其首个市级单位 存下当前选中的市级单位
      this.city = this.cityList[0]
      this.geoLo.adm2 = this.city.value

      // 遍历找到该市级单位下辖的县(区)级单位 并转化为数组
      this.sourceDistricts.forEach(item => {
        if (this.city.code == item.code) {
          this.districtsList = this.obj2arr(item.value)
        }
      })
      // 选中市级单位时默认选中其首个县(区)级单位 存下当前选中的县(区)级单位
      this.districts = this.districtsList[0]
      this.geoLo.location = this.districts.value
      this.geoLo.abcode = this.districts.code
    },
    selectCity(obj) {
      // 存下当前选中的市级单位
      this.geoLo.adm2 = obj.value
      // 选中其他市级单位时 清除之前选中的县(区)级单位
      this.districts = {};
      // 遍历找到该市级单位下辖的县(区)级单位 并转化为数组
      this.sourceDistricts.forEach(item => {
        if (this.city.code == item.code) {
          this.districtsList = this.obj2arr(item.value)
        }
      })
      // 选中市级单位时默认选中其首个县(区)级单位 存下当前选中的县(区)级单位
      this.districts = this.districtsList[0]
      this.geoLo.location = this.districts.value
      this.geoLo.abcode = this.districts.code
    },
    selectDistricts(obj) {
      // 存下当前选中的县(区)级单位
      this.geoLo.location = obj.value
      this.geoLo.abcode = obj.code
    },
    submit() {
      this.$emit('areaClick', this.geoLo);
    },
    obj2arr(obj) {
      let arr = [];
      for (let item in obj) {
        arr.push({
          code: item,
          value: obj[item]
        })
      }
      return arr
    }
  }
};
</script>

<style scoped>
.area_select {
  width: 100%;
  height: 100%;
  position: relative;
}

.area_select>span {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.el-button {
  width: 193px;
}
</style>