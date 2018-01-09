<template>
	<div id="preview">
		<h1>{{resume.profile.name||"大侠尊姓大名"}}</h1>
		<h1>{{resume.profile.city||"来自何方"}}</h1>
		<h1>{{resume.profile.word||"告诉世界你很棒"}}</h1>
		<h1 v-for="item in resume.education">
			{{item.school}}
			{{item.major}}
			{{item.award}}
		</h1>
		<h1 v-for="item in resume.project">
			{{item.name}}
			{{item.content}}
		</h1>
		<h1 v-for="item in resume.work">
			{{item.company}}
			{{item.content}}
		</h1>
		<h1 v-for="item in resume.skill">
			{{item.skill}}
		</h1>
		<h1>{{resume.evaluation}}</h1>
	</div>
</template>

<script>
  export default{
    props: ['resume'],
    methods: {
      isEmpty (object) {
        let empty = true
        for (let key in object) {
          if (object[key]) {
            empty = false
            break
          }
        }
        return empty
      },
      filter (array) {
        return array.filter(item => !(this.isEmpty(item)))
      }
    },
    created () {
      console.log('加载预栏组件了')
    }
  }
</script>

<style>
#preview{
	overflow: auto;
	padding: 20px;
}
</style>