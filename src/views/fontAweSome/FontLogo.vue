<template>
  <div class="FontLogo">
     <i class="changeRed fa fa-heart" style="color:red"></i>
     <br>
     <i class="fa fa-comments" style="color:#28FF28"></i>

  </div>
</template>

<script>
export default {
  name: 'FontLogo',
  components: {
    
  },
  data(){
  	return {
  		 data:'hello world'
  	}
  },
  methods:{

  },
  mounted(){
  	 $('.changeRed').css('color','#f40');
  }
}
</script>

<style scoped>
 
</style>