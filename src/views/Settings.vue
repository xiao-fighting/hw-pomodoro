<template>
  <div id="settings">
    <b-table :items="items" :fields="fields" @row-clicked="selectAlarm">
      <template v-slot:cell(preview)="data">
        <audio controls :src="'./alarms/'+data.item.file"></audio>
      </template>
      <template v-slot:cell(select)="data" class="check">
         <font-awesome-icon v-if="data.item.file == alarm" :icon="['fas','check-circle']" ></font-awesome-icon>
      </template>
    </b-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      items: [
        {
          name: '波妞',
          file: '波妞.mp3'
        },
        {
          name: '哆啦A夢',
          file: '哆啦A夢.mp3'
        },
        {
          name: '直到世界的盡頭',
          file: '直到世界的盡頭.mp3'
        },
        {
          name: '想大聲說我喜歡你',
          file: '想大聲說我喜歡你.mp3'
        }
      ],
      fields: [
        // bootstap table 的欄位
        // 第一個欄位
        {
          key: 'name',
          label: '名稱'
        },
        // 第二個欄位，要放音樂撥放器，試聽
        {
          key: 'preview',
          label: '預覽'
        },
        // 第三個欄位，選擇某個鈴聲，打勾
        {
          key: 'select',
          label: '選擇'
        }
      ]
    }
  },
  computed: {
    alarm () {
      return this.$store.getters.alarm
    }

  },
  methods: {
    selectAlarm (item) {
    // 呼叫 mutation中的 selectAlarm，把 item.file(例如波妞.mp3 (存檔名))傳進去
      this.$store.commit('selectAlarm', item.file)
    }
  }
}
</script>
