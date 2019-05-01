<template>
  <div class="cityChooseM">
   		<!-- 城市选择弹框 -->
    	<!-- 与地址新增组件城市选择组件大致雷同可复用，优化时 -->
    	<div class="addressChoose" v-show="choose_boo">
			<div class="chooseBg"></div>
			<div class="choose-content">
				<div class="address-head">
					<span>地址选择</span><span class="chi" @click="chooseHide()">&Chi;</span>
				</div>

				<div class="chooseDetail">
				<!-- Cascader 级联选择 -->
					 <Cascader :data="arrCity" :render-format="format" style="width:40%"></Cascader>
				</div>
			</div>
		</div>



		<div class="show" @click="addressChoosePop()">点击地址选择</div>
  </div>
</template>

<script>
import city from './../../../public/city.js'
export default {
  name: 'cityChooseM',
  data(){
	  return {
	  	choose_boo:true,
	  	msg:"cityChooseM",
	  	  // 定义iview联级组件数据
        arrCity: [{
                    value: 'zhejiang',
                    label: '浙江',
                    children: [{
                        value: 'hangzhou',
                        label: '杭州',
                        children: [{
                            value: 'xihu',
                            label: '西湖',
                            code: 310000
                        }]
                    }]
                }, 
                {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [{
                        value: 'nanjing',
                        label: '南京',
                        children: [{
                            value: 'zhonghuamen',
                            label: '中华门',
                            code: 210000
                        }]
                    }]
        }]
	  }
    
  },
  methods:{
  	 addressChoosePop(){
    	
    	this.choose_boo=false;
    },
    chooseHide(){
    	this.choose_boo=false;
    },
    addressChoosePop(){
    	
    	this.choose_boo=true;
    },
    // 定义iview联级组件方法
  	format (labels, selectedData) {
                // const index = labels.length - 1;
                // const data = selectedData[index] || false;
                // if (data && data.code) {
                //     return labels[index] + ' - ' + data.code;
                // }
              	
                // return labels[index];
                if(labels!=[]){
                	// this.msg.address=labels[0]+labels[1]+labels[2];
                	if(labels[0])this.province=labels[0];
                	if(labels[1])this.city=labels[1];
                	if(labels[2])this.area=labels[2];
                	this.choose_boo=false;
                	console.log("选择的省为:"+this.province+"\n"+"选择的城市为:"+this.city+"\n"+"选择的地区为:"+this.area)
                }
                
    }
  },
  mounted(){
  	this.arrCity=city;
  }
}
</script>

 
<style scoped>
/*地址选择弹窗*/
.addressChoose{
	width:100%;
	height:100vh;
	position:absolute;
	top:0;
	left:0;
	display:flex;
	display:-webkit-flex;
	align-items: center;
	justify-content: center;
	z-index:50000000;
	transition: 5s;
}

.chooseBg{
	width:100%;
	height:100%;
	background:#000;
	position:absolute;
	top:0;
	left:0;
	opacity:0.5;
}

.choose-content{
	width:100%;
	height:75%;
	position:absolute;
	bottom:0;
	background:#fff;
	z-index:10;
	overflow:hidden;
	 
}
.address-head{
	width:100%;
	height:40px;
	 
	display:flex;
	display:-webkit-flex;
	align-items: center;
	justify-content: center;
	position:relative;
	border-bottom:1px solid #ccc;
}

.chi{
	position:absolute;
	right:15px;
	font-size:20px;
}

.chooseDetail{
	width:100%;
	display:flex;
	display:-webkit-flex;
	margin-top:5px;
	padding-left:5px;

}
.iosOurter{
	padding:3px 10px;
	border: 1px solid #ccc;
	border-radius:20px;
}
.defColor{
	width:30px;
	height:20px;
	background:#ccc;
	border-radius:20px;
}
.show{
	width:100%;
	height:50px;
	background:blue;
	color:#fff;
	font-size:20px;
	display:flex;
	display:-webkit-flex;
	align-items: center;
	justify-content: center;
}
</style>