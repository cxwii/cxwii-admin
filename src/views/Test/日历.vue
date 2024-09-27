<script lang="ts" setup>
import { ref } from 'vue'

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const monthDays = ref<Array<{ date: number; isHoliday: boolean }>>([])

const generateMonthDays = (month: number, year: number) => {
  const totalDays = new Date(year, month, 0).getDate()
  const holidays = [1, 6, 9, 20] // 标记假日

  for (let date = 1; date <= totalDays; date++) {
    monthDays.value.push({
      date,
      isHoliday: holidays.includes(date) // 判断是否是假期
    })
  }
}
generateMonthDays(10, 2024)
</script>

<template>
  <div class="calendar">
    <!-- 表头 -->
    <div class="header" v-for="(day, index) in days" :key="index">{{ day }}</div>
    <!-- 日期 -->
    <div class="day" v-for="day in monthDays" :key="day.date" :class="{ holiday: day.isHoliday }">
      {{ day.date }}
    </div>
  </div>
</template>

<style>
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.header {
  background-color: #8a8989;
  text-align: center;
  padding: 10px;
  font-weight: bold;
}

.day {
  background-color: #ffffff;
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
}

.holiday {
  background-color: #db2f2c;
}
</style>
