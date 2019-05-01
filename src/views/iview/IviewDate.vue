<template>
  <div class="iviewDate">
    <Date-picker
        :open="open"
        :value="value3"
        confirm
        type="date"
        @on-change="handleChange"
        @on-clear="handleClear"
        @on-ok="handleOk"
        :options="options3">
        <a href="javascript:void(0)" @click="handleClick" style="color:blue">
            <Icon type="ios-calendar-outline" style="color:purple"></Icon>
            <template v-if="value3 === ''">选择日期</template>
            <template v-else>{{ value3 }}</template>
        </a>
    </Date-picker>
  </div>
</template>

<script>
export default {
  name: 'iviewDate',
  components: {
    
  },
  data(){
  	return {
                open: false,
                value3: '',
                options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },

            }
  },
  methods:{
    handleClick () {
                this.open = !this.open;
            },
    handleChange (date) {
        this.value3 = date;
        
    },
    handleClear () {
        this.open = false;
    },
    handleOk () {
        this.open = false;
        console.log(this.value3)
    }
  },
  mounted(){
  	 
  }
}
</script>

<style scoped>
 .iviewDate{
    box-sizing:border-box;
    padding-left:10%;
 }
</style>