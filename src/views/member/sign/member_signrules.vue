<template>
  <div id="signrules">
    <c-title :hide="false"
             text='规则说明'></c-title>
			 <div style="height:40px;"></div>
       <div v-html='rules'>
       </div> 
  </div>
</template>
<script>
import member_signrulescontroller from './member_signrulescontroller';
export default member_signrulescontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#signrules{
	
  
}


</style>