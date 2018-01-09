<template>
  <div id="editor">
    <nav>
      <ol>
        <li v-for="i in [0,1,2,3,4,5]"
            v-bind:class="{active:currentTab===i}" 
            v-on:click="currentTab=i">
            <svg class="icon">
              <use v-bind:xlink:href="`#icon-${icons[i]}`"></use>
            </svg>
        </li>
      </ol>
    </nav>
    <ol class="panes">
      <li v-bind:class="{active:currentTab===0}">
        <h2>个人信息</h2>
        <el-form  >
          <el-form-item label="姓名">
            <el-input v-model="resume.profile.name"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="resume.profile.city"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="resume.profile.word"></el-input>
          </el-form-item>
        </el-form>
      </li>
      <li v-bind:class="{active:currentTab===1}">
        <Items v-bind:items="resume.education" v-bind:title="'教育经历'" v-bind:label="['学校', '主修课程', '获奖情况']"></Items>
      </li>
      <li v-bind:class="{active:currentTab===2}">
        <Items v-bind:items="resume.project" v-bind:title="'项目经历'" v-bind:label="['项目名称', '负责内容']"></Items>
      </li>
      <li v-bind:class="{active:currentTab===3}">
        <Items v-bind:items="resume.work" v-bind:title="'工作经验'" v-bind:label="['公司名称', '工作内容']"></Items>
      <li v-bind:class="{active:currentTab===4}">
        <Items v-bind:items="resume.skill" v-bind:title="'职业技能'" v-bind:label="['技能名称']"></Items>
      <li v-bind:class="{active:currentTab===5}">
        <h2>自我评价</h2>
        <br/>
        <el-input
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="resume.evaluation">
        </el-input>
      </li>
    </ol>
  </div>
</template>

<script>
  import Items from './Items'
  export default{
    props: ['resume'],
    components: { Items },
    data () {
      return {
        currentTab: 0,
        icons: ['gerenxinxi', 'jiaoyu', 'tongshiguan', 'works', 'jineng', 'ziwopingjiam4']
      }
    }
  }
</script>

<style>
  #editor{
    display: flex;
    overflow: hidden;
  }
  #editor > nav{
    background:black;
    width: 80px;
  }
  #editor > nav > ol > li{
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
  }
  #editor > nav > ol > li > .icon{
    width: 32px;
    height: 40px;
    fill: white;
  }
  #editor > nav > ol > .active{
    background-color: white;
  }
  #editor > nav > ol > .active >.icon{
    fill: black;
  }
  #editor > .panes{
    width: 100%;
  }
  #editor > .panes >li{
    display: none;
    height: 100%;
    padding: 20px 10px;
    overflow: auto;
  }
  #editor > .panes >.active{
    display: block;
  }
  #editor > .panes >li #evaluation{
    height: 500px;
    overflow-y: visible;
  }
</style>
