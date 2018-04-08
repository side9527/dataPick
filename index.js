export default {
  name: 'datePick',
  props: ['dateTime', 'minute', 'second', 'clear'],
  data () {
    return {
      weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      time: {
        year: '',
        month: '',
        day: '',
        hou: '',
        min: '',
        sec: ''
      },
      pick: {
        year: '',
        month: '',
        day: '',
        hou: '',
        min: '',
        sec: ''
      },
      houTime: '',
      minTime: '',
      secTime: '',
      year: '',
      yearArr: 15,
      lastMonth: {
        over: 0,
        total: 0
      },
      nowMonth: {
        total: 0
      },
      nextMonth: {
        total: 0
      },
      monthArr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      yearFlag: false,
      monthFlag: false,
      minFlag: false,
      inputFlag: false,
      clearFlag: false,
      flag: false,
      showMin: false,
      showSec: false
    }
  },

  watch: {
    yearFlag (val) {
      if (val) {
        this.year = this.time.year - 8
      }
    },
    flag (val) {
      if (val) {
        this.initDate()
        this.clearFlag = !this.clear
        this.showMin = !this.minute
        this.showSec = !this.second
      }
    }
  },

  methods: {
    zeroType (n) {
      return (n > 9) ? n : '0' + n
    },
    nowTime (num, j) {
      let options = {}
      options.sign = 'yyyy-MM-dd HH:mm:ss'
      let _complete = n => {
        return (n > 9) ? n : '0' + n
      }
      let d = new Date()
      if (num) {
        let newtimems = d.getTime() - (num * 24 * 60 * 60 * 1000)
        d.setTime(newtimems)
      }
      let year = d.getFullYear()
      let month = _complete(d.getMonth() + 1)
      let day = _complete(d.getDate())
      let hours = _complete(d.getHours())
      let minutes = _complete(d.getMinutes())
      let second = _complete(d.getSeconds())
      let result = options.sign
      result = result.replace('yyyy', year)
      result = result.replace('MM', month)
      result = result.replace('dd', day)
      result = result.replace('HH', hours)
      result = result.replace('mm', minutes)
      result = result.replace('ss', second)
      if (!j) {
        result = result.substring(0, result.length - 3)
      }
      return result
    },
    outputTime () {
      let self = this
      let pickTime = ''
      let zeroType = self.zeroType
      if (self.minute) {
        pickTime = self.second ? `${self.time.year}-${zeroType(self.time.month)}-${zeroType(self.time.day)} ${zeroType(self.time.hou)}:${zeroType(self.time.min)}:${zeroType(self.time.sec)}` : `${self.time.year}-${zeroType(self.time.month)}-${zeroType(self.time.day)} ${zeroType(self.time.hou)}:${zeroType(self.time.min)}`
      } else {
        pickTime = `${self.time.year}-${zeroType(self.time.month)}-${zeroType(self.time.day)}`
      }
      self.$emit('change', pickTime)
    },
    houTest () {
      let self = this
      if (+self.houTime > 24 || +self.houTime < 0) {
        self.houTime = self.zeroType(+self.pick.hou)
      }
      self.houTime = self.zeroType(+self.houTime)
      self.pick.hou = +self.houTime
    },
    minTest () {
      let self = this
      if (+self.minTime > 59 || +self.minTime < 0) {
        self.minTime = self.zeroType(+self.pick.min)
      }
      self.minTime = self.zeroType(+self.minTime)
      self.pick.min = +self.minTime
    },
    secTest () {
      let self = this
      if (+self.secTime > 59 || +self.secTime < 0) {
        self.secTime = self.zeroType(+self.pick.sec)
      }
      self.secTime = self.zeroType(+self.secTime)
      self.pick.sec = +self.secTime
    },
    pickOver () {
      this.time.day = this.pick.day ? this.pick.day : 1
      this.time.year = this.pick.year
      this.time.month = this.pick.month
      this.time.hou = this.pick.hou ? this.pick.hou : 0
      this.time.min = this.pick.min ? this.pick.min : 0
      this.time.sec = this.pick.sec ? this.pick.sec : 0
      this.flag = false
      this.yearFlag = false
      this.monthFlag = false
      this.minFlag = false
      this.outputTime()
    },
    pickDay (i, j) {
      let self = this
      self.pick.day = i
      self.time.day = self.pick.day
      if (j) {
        if (j > 0) {
          if (self.pick.month + 1 === 13) {
            self.pick.month = 1
            self.pick.year += 1
          } else {
            self.pick.month += 1
          }
        } else {
          if (self.pick.month - 1 === 0) {
            self.pick.month = 12
            self.pick.year -= 1
          } else {
            self.pick.month -= 1
          }
        }
      }
      self.time.year = self.pick.year
      self.time.month = self.pick.month
    },
    pickYear (i) {
      this.pick.year = i
      this.initDate('year', i)
      this.yearFlag = false
    },
    pickMonth (i) {
      this.pick.month = i
      this.initDate('month', i)
      this.monthFlag = false
    },
    clearnData () {
      this.$emit('change', '')
      this.flag = false
    },
    changeMonth (i) {
      let self = this
      if (i) {
        if (self.pick.month + 1 === 13) {
          self.pick.month = 1
          self.pick.year += 1
          self.initDate('add', self.pick.year, self.pick.month)
        } else {
          self.pick.month += 1
          self.initDate('month', self.pick.month)
        }
      } else {
        if (self.pick.month - 1 === 0) {
          self.pick.month = 12
          self.pick.year -= 1
          self.initDate('add', self.pick.year, self.pick.month)
        } else {
          self.pick.month -= 1
          self.initDate('month', self.pick.month)
        }
      }
    },
    initDate (key, i, j) {
      let self = this
      let rawTime = self.dateTime ? self.dateTime : self.nowTime()
      let nowDate = new Date(rawTime.replace('-', '/'))
      if (!key) {
        self.time.year = nowDate.getFullYear()
        self.time.month = nowDate.getMonth() + 1
        if (self.dateTime === '') {
          self.time.hou = 0
          self.time.min = 0
          self.time.sec = 0
          self.time.day = ''
        } else {
          self.time.hou = nowDate.getHours()
          self.time.min = nowDate.getMinutes()
          self.time.sec = nowDate.getSeconds()
          self.time.day = nowDate.getDate()
        }
        self.pick.hou = self.time.hou
        self.pick.min = self.time.min
        self.pick.sec = self.time.sec
        self.pick.year = self.time.year
        self.pick.month = self.time.month
        self.houTime = self.zeroType(self.time.hou)
        self.minTime = self.zeroType(self.time.min)
        self.secTime = self.zeroType(self.time.sec)
      }
      if (key === 'year') nowDate.setFullYear(i)
      if (key === 'month') nowDate.setMonth(i - 1)
      if (key === 'day') nowDate.setDate(i)
      if (key === 'add') {
        nowDate.setFullYear(i)
        nowDate.setMonth(j - 1)
      }
      let nowYear = nowDate.getFullYear()
      let nowMonth = nowDate.getMonth() + 1
      if (self.dateTime === '') {
        self.pick.day = ''
      } else {
        self.pick.day = nowDate.getDate()
      }
      nowDate.setDate(1)
      self.lastMonth.over = nowDate.getDay()
      self.lastMonth.total = nowMonth - 1 <= 0 ? self.getMonthDays(nowYear - 1)[11] : self.getMonthDays(nowYear)[nowMonth - 2]
      self.nowMonth.total = self.getMonthDays(nowYear)[nowMonth - 1]
      self.nextMonth.total = 42 - self.nowMonth.total - self.lastMonth.over
    },
    isLeap (year) {
      return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
    },
    getMonthDays (year) {
      return [31, 28 + this.isLeap(year), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31]
    }
  }
}
