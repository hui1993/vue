<template>
  <div id="app" v-bind:class="{previewMode:previewMode}">
    <Topbar v-on:preview="preview" v-bind:resume="resume" v-bind:user="user" v-on:logIn="logIn"></Topbar>
    <main>
        <Editor v-bind:resume="resume"></Editor>
        <Preview v-bind:resume="resume"></Preview>
        <el-button class="exit" v-on:click="previewExit">
          <i class="el-icon-caret-right"></i>
        </el-button>
        <LogIn v-if="loginMode" v-bind:user="user" v-bind:resume="resume" v-on:done="done" v-on:logined="logined"></LogIn>
    </main>
  </div>
</template>

<script>
import Topbar from './components/topbar'
import Editor from './components/editor'
import Preview from './components/preview'
import LogIn from './components/LogIn'
import AV from 'leancloud-storage'
export default {
  name: 'app',
  components: {
    Topbar, Editor, Preview, LogIn
  },
  data () {
    return {
      previewMode: false,
      loginMode: false,
      resume: {
        profile: {name: '', city: '', word: ''},
        education: [{school: '', major: '', award: ''}],
        project: [{name: '', content: ''}],
        work: [{company: '', content: ''}],
        skill: [{skill: ''}],
        evalution: ''
      },
      user: {
        name: '',
        password: '',
        id: 0
      }
    }
  },
  methods: {
    preview () {
      this.previewMode = true
    },
    previewExit () {
      this.previewMode = false
    },
    logIn () {
      this.loginMode = true
      console.log(this.loginMode)
    },
    done () {
      this.loginMode = false
    },
    logined () {
      var _this = this
      var todo = AV.Object.createWithoutData('Todo', _this.user.id)
      todo.fetch().then(function () {
        var resume = JSON.parse(todo.get('content'))
        _this.resume = resume
        console.log(_this.resume)
        _this.loginMode = false
      }, function (error) {
        console.error(error)
      })
    }
  }
}
</script>

<style>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
#topbar{
  position: relative;
  z-index: 3;
}
main{
  display: flex;
  flex: 1;
  justify-content: space-around;
  background-color: #ddd;
}
main > #editor{
  width: 30em;
  margin: 16px;
  background-color: white;
  box-shadow: 0 0 3px #999;
  border-radius: 3px;
}
main > #preview{
  flex: 1;
  margin: 16px;
  max-width: 900px;
  background-color: white;
  box-shadow: 0 0 3px #999;
  border-radius: 3px;
}
main > .exit{
  display: none;
}
.previewMode >#topbar{
  display: none;
}
.previewMode > main > #editor{
  display: none;
}
.previewMode > main > .exit{
  display: block;
  position: absolute;
  top: 30px;
  right: 30px; 
}
</style>
