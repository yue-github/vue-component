<template>
  <div class="home">
    <br>
    <div class="progress">
        <router-link to="/iviewProgress" class="iv-progress">{{iviewProgress}}</router-link>
    </div>
    <br>
    <div class="progress">
        <router-link to="/checkBox" class="iv-progress">{{elementCheckBox}}</router-link>
    </div>
    <br>
    <div class="progress">
        <router-link to="/SwiperBannerModule" class="iv-progress">{{swiperBannerModule}}</router-link>
    </div>
  </div>
</template>

<script>

 

export default {
  name: 'home',
  components: {
    
  },
  data(){
  	return {
  		iviewProgress:'iview-progress',
      elementCheckBox:'elementCheckBox',
      swiperBannerModule:'swiperBannerModule'
  	}
  },
  mounted(){
  	console.log('iview');
  }
}
</script>
<style scoped>
 .progress{
  text-align:center;
 }
 .iv-progress{
  color:red;
 }
</style>