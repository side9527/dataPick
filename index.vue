<template>
  <div class="datePick" v-if="flag">
    <div>
      <div class="tit">
        <div class="l" v-if="!yearFlag && !monthFlag && !minFlag" @click="changeMonth(0)"></div>
        <div class="m">
          <div @click="yearFlag = true;">{{pick.year}}</div>
          <div @click="monthFlag = true;">{{monthArr[pick.month - 1]}}</div>
        </div>
        <div class="r" v-if="!yearFlag && !monthFlag && !minFlag" @click="changeMonth(1)"></div>
      </div>
      <div class="box">
        <ul class="week">
          <li v-for="(item, index) in weekArr" :key="index">{{item}}</li>
        </ul>
        <ul class="date">
          <li class="none" v-for="item in lastMonth.over" :key="item">{{lastMonth.total - (lastMonth.over - item)}}</li>
          <li :class="{'on': item === time.day}" v-for="item in nowMonth.total" :key="item + 40" @click="pickDay(item)">{{item}}</li>
          <li class="none" v-for="item in nextMonth.total" :key="item + 80">{{item}}</li>
        </ul>
        <ul class="year" v-if="yearFlag">
          <li v-for="item in yearArr" @click="pickYear(year + item)" :key="item">{{year + item}}</li>
          <span class="l" @click="year -= 15"></span>
          <span class="m" @click="yearFlag = false;">返回日期选择</span>
          <span class="r" @click="year += 15"></span>
        </ul>
        <ul class="month" v-if="monthFlag">
          <li v-for="(item, index) in monthArr" @click="pickMonth(index + 1)" :key="index">{{item}}</li>
          <span class="m" @click="monthFlag = false;">返回日期选择</span>
        </ul>
      </div>
      <div class="btn clearfix">
        <span v-if="!showMin || !showSec">
          时间：
          <input type="text" @blur="houTest" v-model="houTime">
          <b> : </b>
          <input type="text" @blur="minTest" v-model="minTime">
          <b v-if="!showSec"> : </b>
          <input v-if="!showSec" type="text" @blur="secTest" v-model="secTime">
        </span>
        <div class="cancle" @click="flag = false;">取消</div>
        <div class="clear" v-if="!clearFlag" @click="clearnData">清空</div>
        <div class="ok" @click="pickOver">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import Index from './index.js'
export default Index
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import './index.scss';
</style>
