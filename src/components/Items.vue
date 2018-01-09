<template>
  <div>
    <h2>{{title}}</h2>
    <el-form  >
      <div class="container" v-for="(item, index) in items">
        <i class="el-icon-circle-close" v-on:click="removeItem(index)"></i>
        <el-form-item v-for="(key, index) in keys" v-bind:label="label[index]" v-bind:key="key">
          <el-input v-model="item[key]"></el-input>
        </el-form-item>    
      </div>
    <el-button v-on:click="addItem">添加</el-button>
    </el-form> 
  </div>
</template>

<script>
  export default{
    props: ['items', 'title', 'label'],
    computed: {
      keys () {
        return Object.keys(this.items[0])
      }
    },
    methods: {
      addItem () {
        const empty = {}
        this.keys.map((key) => {
          empty[key] = ''
        })
        this.items.push(empty)
      },
      removeItem (index) {
        if (this.items.length === 1) {
          return
        }
        this.items.splice(index, 1)
      }
    }
  }
</script>

<style>
  .container {
    position: relative;
  }
  .container > .el-icon-circle-close{
    position: absolute;
    top: 12px;
    right: 0;
    cursor: pointer;
    z-index: 2;
  }
</style>