<script lang="ts" setup>
import { getPhraseApi } from '@/api/User'
import { useUserStore } from '@/store/modules/user'
import { ref, onMounted } from 'vue'
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'

const userStore = useUserStore()
const userPic = userStore.getUserPic ? userStore.getUserPic : null

// 名人名言
const phraseRef = ref('')
const authorRef = ref('')

// 图表数据
const EchartOptions = ref({
  data: {
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        color: "rgba(66, 193, 248, 1)"
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 44, name: 'Vue' },
          { value: 29, name: 'TS' },
          { value: 18, name: 'JS' },
          { value: 8, name: 'HTML' },
          { value: 5, name: 'Other' }
        ]
      }
    ]
  }
})

const getPhrase = async () => {
  const res = await getPhraseApi()
  phraseRef.value = res.data.phrase
  authorRef.value = res.data.author
}

const toDocument = () => {
  window.open('https://github.com/cxwii/cxwii-admin')
}

onMounted(() => {
  getPhrase()
})
</script>

<template>
  <div class="homeContent">
    <div class="head">
      <div class="userIofo mr-5 shadow-md bg-[#f5f5f5] dark:bg-[#282727]">
        <div class="userIofoHead">
          <img v-if="userPic" :src="userPic" alt="" class="rounded-full w-14" />
          <img v-else src="@/assets/imgs/user.png" alt="" class="rounded-full w-14" />
          <div class="opacity-80 break-all ml-5 text-xl">Hello,{{ userStore.getUsername }}</div>
        </div>
        <div class="userIofoBottom">
          <div class="opacity-70 mt-5 text-sm">{{ phraseRef }}</div>
          <div class="mt-5 flex justify-end opacity-40 text-xs">—— {{ authorRef }}</div>
        </div>
      </div>
      <div class="synopsis shadow-md bg-[#f5f5f5] dark:bg-[#282727]">
        <div class="text-xl m-5">✨欢迎使用cxwii-Admin</div>
        <div class="text-base m-6 opacity-80"
          >这是一款服务于前端开发者,以开箱即用,符合直觉作为主旨的集成解决方案中心。适合作为各类业务解决方案,项目启动骨架。经历反复打磨,不断修改,欢迎大家的使用。</div
        >
        <div class="flex justify-end m-5">
          <el-button @click="toDocument">欢迎Starred 🤞</el-button>
        </div>
      </div>
    </div>
    <div class="bottom mt-5">
      <div class="elaboration mr-5 shadow-md bg-[#f5f5f5] dark:bg-[#282727]">
        <div class="elaborationHead text-xl">💡<b class="ml-1">特性</b></div>
        <div class="elaborationBottom mt-8">
          <div class="m-3"
            >🎇 采用<b> 现代WEB </b>主流技术标准:
            <span class="spanText shadow-md bg-[#ffffff] dark:bg-[#000000]"
              >HTML5 + CSS3 + ES6 + TS</span
            ></div
          >
          <div class="m-3"
            >🆒 使用<b> Vue3 </b>主流技术栈:
            <span class="spanText shadow-md bg-[#ffffff] dark:bg-[#000000]">Vite + Vue3</span></div
          >
          <div class="m-3">🎨 二次封装<b> ElementPlus </b>UI组件,优雅,易用,符合符合直觉</div>
          <div class="m-3">🖼 封装<b> Echarts </b>和<b> THREE </b>的2D和3D数据可视化库组件</div>
          <div class="m-3"
            >💎 封装常见<b> 前端业务库 </b>的实例组件:
            <span class="spanText shadow-md bg-[#ffffff] dark:bg-[#000000]"
              >xgplaye, qrcode, wangeditor等</span
            ></div
          >
          <div class="m-3"
            >⚙ 封装基于<b> 原生JS </b>的原生组件, 采用<b> WebComponents </b>的思想</div
          >
          <div class="m-3"
            >🧬 使用<b> CSS原子化 </b>技术框架:
            <span class="spanText shadow-md bg-[#ffffff] dark:bg-[#000000]">TailwindCSS</span>
            轻量,便捷</div
          >
          <div class="m-3"
            >🐱‍🐉 应用<b> 微前端 </b>技术框架:
            <span class="spanText shadow-md bg-[#ffffff] dark:bg-[#000000]">MicroApp</span> 搭建
            <span class="spanText shadow-md bg-[#ffffff] dark:bg-[#000000]"
              >Vue2, React18, Angular17</span
            >
            开发环境,可以高效兼容开发</div
          >
          <div class="m-3"
            >🌟 实验<b> 个人UI库 </b
            ><span class="spanText shadow-md bg-[#ffffff] dark:bg-[#000000]">VxwUI</span>,
            感兴趣可以移步个人主页查看</div
          >
          <div class="w-full flex justify-center pt-1 text-sm"
            ><div class="opacity-50">👉 点击</div
            ><b class="opacity-60 cursor-pointer" @click="toDocument"> 详情 </b
            ><div class="opacity-50">查看所有功能,更多实用功能火速开发中 🔥</div></div
          >
        </div>
      </div>
      <div class="technology shadow-md bg-[#f5f5f5] dark:bg-[#282727]">
        <div class="elaborationHead text-xl">🛠️<b class="ml-1">技术栈</b></div>
        <Echart :options="(EchartOptions.data as EChartsOption)" :height="450"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.homeContent {
  .head {
    display: flex;
    .userIofo {
      flex: 3;
      padding: 20px;
      border-radius: 5px;
      .userIofoHead {
        display: flex;
        align-items: center;
        min-width: 200px;
      }
    }
    .synopsis {
      flex: 7;
      border-radius: 5px;
    }
  }
  .bottom {
    display: flex;
    .elaboration {
      padding: 20px;
      flex: 1;
    }
    .technology {
      padding: 20px;
      flex: 1;
    }
  }
}
.spanText {
  border-radius: 5px;
  opacity: 1;
  padding: 2px 8px;
}
</style>
