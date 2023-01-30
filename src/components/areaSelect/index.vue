<template>
  <div>
    <el-select v-model="province" placeholder="请选择省" @change="selectCity">
      <el-option v-for="item in provinceList" :key="item.code" :label="item.value" :value="item.code">
      </el-option>
    </el-select>
    <el-select v-model="city" placeholder="请选择市" @change="selectDistricts">
      <el-option v-for="item in cityList" :key="item.code" :label="item.value" :value="item.code">
      </el-option>
    </el-select>
    <el-select v-model="districts" placeholder="请选择区">
      <el-option v-for="item in districtsList" :key="item.code" :label="item.value" :value="item.code">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import DEFAULT_AREA from '@/utils/area'
export default {
  data() {
    return {
      province: '',
      provinceList: [],
      city: '',
      cityList: [],
      districts: '',
      districtsList: [],
      sourceCity: [],
      sourceDistricts: []
    };
  },
  mounted() {
    this.provinceList = this.obj2arr(DEFAULT_AREA.province)
    this.sourceCity = this.obj2arr(DEFAULT_AREA.city);
    this.sourceDistricts = this.obj2arr(DEFAULT_AREA.districts);

  },
  methods: {
    selectCity() {
      this.city = '';
      this.districts = '';
      this.sourceCity.forEach(item => {
        if (this.province == item.code) {
          this.cityList = this.obj2arr(item.value)
        }
      })
      this.city = this.cityList[0].code
      this.sourceDistricts.forEach(item => {
        if (this.city == item.code) {
          this.districtsList = this.obj2arr(item.value)
        }
      })
      this.districts = this.districtsList[0].code
    },
    selectDistricts() {
      this.districts = '';
      this.sourceDistricts.forEach(item => {
        if (this.city == item.code) {
          this.districtsList = this.obj2arr(item.value)
        }
      })
      this.districts = this.districtsList[0].code

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

</style>