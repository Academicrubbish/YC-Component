<template>
  <!-- 日历 -->
  <div class="calendar">
    <div class="calendar-head">
      <span class="head-left">日程管理</span>
      <span class="head-right">
        <el-button type="primary" size="mini" plain round>新建</el-button>
        <el-button type="text" size="mini" style="color: grey;">更多</el-button>
      </span>
    </div>
    <div class="calendar-body">
      <div class="body-bar">
        <div class="bar-left">
          <el-button type="text" class="el-icon-d-arrow-left" @click="minusYear(true)">
          </el-button>
          <el-button type="text" class="el-icon-arrow-left" @click="minusMonth">
          </el-button>
        </div>
        <div class="bar-center" style="flex-grow:2;">
          {{ date.year }}年{{ date.month + 1 }}月
        </div>
        <div class="bar-right">
          <el-button type="text" class="el-icon-arrow-right" @click="plusMonth">
          </el-button>
          <el-button type="text" class="el-icon-d-arrow-right" @click="plusYear(true)">
          </el-button>
        </div>

      </div>
      <div class="body-content">
        <ul class="ul-week">
          <li class="li-week" v-for="(item, index) in week" :key="index">{{ item }}</li>
        </ul>
        <ul class="ul-day">
          <li class="li-day" v-for="(item, index) in days" :key="index" :isThisMonth="item.isThisMonth"
            @click="handleClick(item)" :holiday="item.holiday">
            <div style="text-align: center;">{{ item.date }}</div>
            <div style="text-align: center;transform:scale(0.8);">{{ lunar(item) }}</div>
            <div class="li-hol" v-if="item.holiday == 1">休</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import calendar from "@/utils/calendar";
export default {
  data() {
    return {
      date: {
        year: 2001,
        month: 10,
        date: 26
      },
      week: ["一", "二", "三", "四", "五", "六", "日"],
      days: [],//用来绑定日期的数组
      value: new Date(),
      current: {}
    };
  },
  methods: {
    //点击日期
    handleClick(item) {
      console.log(item.year + "-" + (item.month + 1) + "-" + item.date);
    },
    //下一个月
    plusMonth() {
      if (this.date.month == 11) {
        this.date.month = 0;
        this.plusYear(false);
      } else {
        this.date.month++;
      }
      this.createCalendar(this.date.year, this.date.month);
    },
    //上一个月
    minusMonth() {
      if (this.date.month == 0) {
        this.date.month = 11;
        this.minusYear(false);
      } else {
        this.date.month--;
      }
      this.createCalendar(this.date.year, this.date.month);
    },
    //下一年
    plusYear(create) {
      // if (this.date.year == 2049) {
      //   this.date.year = 1970;
      // } else {
      this.date.year++;
      // }
      if (create) {
        this.createCalendar(this.date.year, this.date.month);
      }
    },
    //上一年
    minusYear(create) {
      // if (this.date.year == 1970) {
      //   this.date.year = 2049;
      // } else {
      this.date.year--;
      // }
      if (create) {
        this.createCalendar(this.date.year, this.date.month);
      }
    },
    //获取公历对应农历日期，节日，节气
    lunar(date) {
      let aa
      let l = calendar.solar2lunar(date.year, date.month + 1, date.date)
      //一般情况下显示日期
      aa = l.IDayCn;
      //月头显示月份
      if (l.IDayCn == '初一') aa = l.IMonthCn;
      //农历节日最优先，其次节气和节日相撞，节气优先
      if (l.lunarFestival != null) aa = l.lunarFestival;
      else if (l.Term != null) aa = l.Term;
      else if (l.festival != null) aa = l.festival;

      return aa
    },
    //获取默认节假日
    holidaysetting(d, i) {
      let holiday = 0
      // let l = calendar.solar2lunar(d.getFullYear(), Number(d.getMonth()) + 1, d.getDate());
      if (i % 7 == 5 || i % 7 == 6) holiday = 1;

      //国庆、劳动、春节标注七天假
      // else if (Number(d.getMonth()) + 1 == 5 || Number(d.getMonth()) + 1 == 10) {
      //   if (d.getDate() <= 7 && d.getDate() >= 1) holiday = 1;
      // }

      // else if (l.lMonth == 1 && l.lDay >= 1 && l.lDay <= 7) holiday = 1;

      return holiday
    },
    createCalendar(year, month) {
      let d = new Date();
      d.setFullYear(year);
      d.setMonth(month);
      d.setDate(0);
      let dayOfFirstDay = d.getDay();
      this.days = [];

      for (let i = 0; i < 42; i++) {
        d.setFullYear(year);
        d.setDate(1);
        d.setMonth(month);
        d.setDate(i - dayOfFirstDay + 1);

        let holiday = this.holidaysetting(d, i);

        let isThisMonth = 1;
        if (d.getMonth() == month) isThisMonth = 2;
        if (
          this.current.date == d.getDate() &&
          this.current.month == d.getMonth() &&
          this.current.year == d.getFullYear()
        ) isThisMonth = 3;

        let date = {
          year: d.getFullYear(),
          month: d.getMonth(),
          date: d.getDate(),
          isThisMonth: isThisMonth,
          holiday: holiday
        };

        this.days.push(date);

      }
    },
  },
  created() {
    let d = new Date();
    this.date.year = d.getFullYear();
    this.date.month = d.getMonth();
    this.date.date = d.getDate();

    this.current.year = d.getFullYear();
    this.current.month = d.getMonth();
    this.current.date = d.getDate();

    this.createCalendar(this.current.year, this.current.month);
  },
};
</script>

<style scoped>
.calendar {
  width: 380px;
  height: 470px;
  padding: 15px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}

.calendar-head {
  display: flex;
}

.calendar-head>span {
  flex: 1;
}

.calendar-head .head-left {
  text-align: left;
  /* margin-left: 7px;
  font-size: 18px;
  font-weight: 600; */
}

.calendar-head .head-right {
  text-align: right;
}

.calendar-body {
  width: 100%;
  height: calc(100% - 28px);
}

.calendar-body .body-bar {
  height: 40px;
  line-height: 40px;
  color: #727272;
  display: flex;
  text-align: center;
}

.calendar-body .body-bar>div {
  flex: 1;
}

.calendar-body .body-bar .bar-left {
  text-align: left;
}

.calendar-body .body-bar .bar-right {
  text-align: right;
}

.calendar-body .body-bar .el-button {
  width: 20px;
  color: #aaa;
  background-color: white;
  border: 0;
}

.body-content {
  width: 100%;
  height: calc(100% - 40px);
}

.ul-week {
  display: flex;
  width: 100%;
  height: 40px;
  padding: 7px 0;
  margin: 0 !important;
  line-height: 25px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  list-style: none;
  box-sizing: border-box;
  border-top: 1px solid #eee;
}

.li-week {
  flex: 1;
}

.ul-day {
  display: grid;
  width: 100%;
  padding: 0 !important;
  margin: 0 !important;
  height: calc(100% - 40px);
  grid-template-rows: repeat(6, calc(100% / 6));
  grid-template-columns: repeat(7, calc(100% / 7));
  list-style: none;
}

.li-day {
  font-size: 12px;
  line-height: 16px;
  border-radius: 5px;
  margin: 1px;
  color: #5B5B5B;
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
  position: relative;
}

.li-day .li-hol {
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  transform: scale(0.85);
}

.li-day:hover {
  background-color: #717DE2;
  color: #fff !important;
  font-size: 15px !important;
  cursor: pointer;
}

.li-day[isThisMonth="1"] {
  color: #BEBEBE;
}

.li-day[isThisMonth="3"] {
  border-radius: 5px;
  color: #fff;
  background-color: #79BBFF;
  font-weight: 600;
}

.li-day[holiday="1"]>div:first-child {
  color: #F7535C;
}
</style>