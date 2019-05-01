<template>
  <div class="EleTree">
     <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" node-key></el-tree>
  </div>
</template>

<script>
export default {
  name: 'EleTree',
  components: {
    
  },
  data(){
  	return {
  		 data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            // children: [{
            //   label: '三级 3-2-1'
            // }]
          }]
        }],
        arrIndex:{
          index_fir:0,
          index_sec:0,
          index_thir:0
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
  	}
  },
  methods:{
    handleNodeClick(obj,node,myselve){
      let vue=this;

      // 获取数据数结构index
        // console.log(obj,node,myselve)
        let $treeNodeId;
      switch(node.level){
        case 1:
        // 用于获取联动一级的index;其中findIndex()函数属于es6+
        $treeNodeId=obj.$treeNodeId;
          vue.arrIndex.index_fir=node.parent.data.findIndex((val,index,item)=>{
              // console.log(val.$treeNodeId)
            return val.$treeNodeId==$treeNodeId;
        })
         
        
        break;

        case 2:
         
         // 用于获取联动二级的index;
         
        $treeNodeId=obj.$treeNodeId;
        
          vue.arrIndex.index_sec=node.parent.data.children.findIndex((val,index,item)=>{
               
            return val.$treeNodeId==$treeNodeId;
        })
         
        // 对要上传的index对象中一级联动index进行修正
        $treeNodeId=node.parent.data.$treeNodeId;
        // console.log(obj,node,myselve)
        // console.log($treeNodeId)
          vue.arrIndex.index_fir=node.parent.parent.data.findIndex((val,index,item)=>{
           
            return val.$treeNodeId==$treeNodeId;
        })
          let{
            index_fir,
            index_sec
          }=vue.arrIndex;
        console.log('二级联动发动请求',{index_fir,index_sec})
        break;

        case 3:
        // console.log(obj,node,myselve)
        $treeNodeId=obj.$treeNodeId;
       
          vue.arrIndex.index_thir=node.parent.data.children.findIndex((val,index,item)=>{
              // console.log(val.$treeNodeId)
            return val.$treeNodeId==$treeNodeId;
        })
         
        // 对要上传的index对象中二级联动index进行修正
        $treeNodeId=node.parent.data.$treeNodeId;
        // console.log(node.parent.data)
          vue.arrIndex.index_sec=node.parent.parent.data.children.findIndex((val,index,item)=>{
              // console.log(val.$treeNodeId)
            return val.$treeNodeId==$treeNodeId;
        })

          // 对要上传的index对象中一级联动index进行修正
        $treeNodeId=node.parent.parent.data.$treeNodeId;
        // console.log(node.parent.data)
          vue.arrIndex.index_fir=node.parent.parent.parent.data.findIndex((val,index,item)=>{
              // console.log(val.$treeNodeId)
            return val.$treeNodeId==$treeNodeId;
        })
        
        console.log('三级联动发动请求',{...vue.arrIndex})

        // 在第三级联动点击时发动请求                                                      要上传的联动index
        //   $.post("https://www.xiaowailian.com/homework/getkcfankui",{student_id:vue.student_id,teacher_id:vue.teacherID,kc_id:vue.kcID,arrIndex:vue.arrIndex},function(RES){
        //   // console.log(JSON.parse(RES))
        // })
        break;
         
        }

        console.log("老师页联动index,默认{0,0,0}",vue.arrIndex)

    }
  },
  mounted(){
  	 
  }
}
</script>

<style scoped>
 
</style>