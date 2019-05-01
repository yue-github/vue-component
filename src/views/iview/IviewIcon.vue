<template>
  <div class="iviewIcon">
      <Icon type="ios-calendar-outline"></Icon>
      <Icon type="bug"></Icon>
      <h1 class="test">test</h1>
  </div>
</template>

<script>
export default {
  name: 'iviewIcon',
  components: {
    
  },
  data(){
    return {
       data:'iviewIcon'
    }
  },
  mounted(){
     $('.test').css({'color':'red'});
     let date=new Date();
     let time=date.getTime()+3600000;
     console.log(new Date(time).toLocaleString('chinese',{hour12:false}))
  }
}
</script>

<style scoped>
 
</style>