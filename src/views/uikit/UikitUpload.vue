<template>
  <div class="UikitUpload">
    <div class="js-upload uk-placeholder uk-text-center">
      <span uk-icon="icon: cloud-upload"></span>
      <span class="uk-text-middle">Attach binaries by dropping them here or</span>
      <div uk-form-custom>
        <input type="file" multiple>
        <span class="uk-link">点击选择</span>
      </div>
    </div>

    <progress id="js-progressbar" class="uk-progress" value="0" max="100" hidden></progress>
    <img :src="imgSrc" alt="" class="imgSrc">
  </div>
</template>

<script>
  let domain='http://gdmzd.com/geomancy/public'
  export default {
    name: 'UikitUpload',
    data(){
      return{
        imgSrc:'https://miao.su/images/2019/02/19/xuewen5df03.md.jpg',
        domain:domain
      }
    },
    components: {

    },
  
   methods:{

   },
   mounted(){
    var bar = document.getElementById('js-progressbar');

    UIkit.upload('.js-upload', {

      // url: this.domain+'/api/jincheng/upload',
      url: 'http://education-test.bayou-tech.cn/file/import_products',
      type:'post',
      multiple: true,
      name:'import',
      beforeSend: function (res) {
        console.log(res.data)
        // this.$axios.post('')
        // console.log('beforeSend', arguments);
      },
      beforeAll: function () {
        // console.log('beforeAll', arguments);
      },
      load: function () {
        // console.log('load', arguments);
      },
      error: function () {
        // console.log('error', arguments);
      },
      complete:res=>{
        console.log(res)
        console.log(this)
         this.imgSrc=this.domain+JSON.parse(res.response)['url']
         console.log(this.imgSrc)
      },

      loadStart: function (e) {
        // console.log('loadStart', arguments);

        bar.removeAttribute('hidden');
        bar.max = e.total;
        bar.value = e.loaded;
      },

      progress: function (e) {
        // console.log('progress', arguments);

        bar.max = e.total;
        bar.value = e.loaded;
      },

      loadEnd: function (e) {
        // console.log('loadEnd', arguments);

        bar.max = e.total;
        bar.value = e.loaded;
        console.log(bar.value)
      },

      completeAll: function () {
        // console.log('completeAll', arguments);

        setTimeout(function () {
          bar.setAttribute('hidden', 'hidden');
        }, 1000);
      }

    });
  }
}
</script>

<style scoped>
.imgSrc{
  display:block;
  width:50%;
  margin: 0 auto;
}
</style>