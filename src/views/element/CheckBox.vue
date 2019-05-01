<template>
  <div class="checkBox" >
    <br>
      <div style="display:flex;justify-content: center;flex-wrap: wrap;">
        <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
      </div>
      <br>
      <div style="display:flex;justify-content: center">
        <el-checkbox-group v-model="checkboxGroup1">
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      
  </div>

</template>

<script>
  const cityOptions = ['上海', '北京', '广州', '深圳','福建'];
export default {
  name: 'checkBox',
  components: {
    
  },
  data(){
  	return {
  		checkboxGroup1: ['上海'],
      cities: cityOptions,
      dynamicTags: ['上海'],
      inputVisible: false,
      inputValue: ''
  	}
  },
  methods:{
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
  },
  mounted(){
  	 
  },
  updated(){
    this.dynamicTags=this.checkboxGroup1;
    this.checkboxGroup1=this.dynamicTags;
    console.log(this.checkboxGroup1)
  }
}
</script>

<style scoped>
 .checkBox{
    width:100%;

 }
 .el-tag{
    margin-left: 5px;
    margin-right:5px;
    margin-top:10px;
  }
  .button-new-tag {
    margin-left: 5px;
    margin-right:5px;
    margin-top:10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 5px;
    margin-right:5px;
    margin-top:10px;
    vertical-align: bottom;
  }
</style>