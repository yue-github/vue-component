<template>
  <div class="IviewProgress">
  		<Progress :percent="pro" status="active"></Progress>
  </div>
 	 
</template>

<script>
 
export default {
  name: 'IviewProgress',
  components: {
     
  },
  data(){
  	return {
  		pro:5
  	}
  },
  mounted(){
  	this.$axios('http://localhost/vc/public/api/test')
  	.then(data=>{
  		console.log(data);
  	})

  	 let timer=setInterval(()=>{
  	 	this.pro++;
  	 	if(this.pro==100){
  	 		this.pro=100;
  	 		clearInterval(timer);
  	 	}
  	 	 
  	 },500)
  }

}
</script>
<style scoped>
 
</style>