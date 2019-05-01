<template>
  <div class="messageWarn">
     <div class="warn" @click="loading">
     	click me
     </div>
        
    
  </div>
</template>

<script>
export default {
  name: 'messageWarn',
  components: {
    
  },
  data(){
  	return {
  		 data:'hello world'
  	}
  },
  methods:{
  	loading () {
  		 this.$Message.destroy();
         this.$Message.loading('加载中');
         setTimeout(()=>{
         	this.$Message.destroy();
         	// this.$Message.success('木马病毒研制成功');
         	// this.$Message.warning('木马病毒研制警告');
         	this.$Message.error('木马病毒研制失败');
         	setTimeout(()=>{
         		this.$Message.destroy();
         	},1500)
         	
         	 
         },3000)
    },
  },
  mounted(){
  	this.$Message.config({
	    top: 300,
	    duration:0
	});

  }
}
</script>

<style scoped>
 .warn{
 	text-align:center;
 	background:blue;
 	color:#fff;
 	font-size: 2rem;
 }
</style>