<template>
  <div class="page lists-show">
    <!--最外层容器-->
    <nav>
      <!--容器上半部分-->
      <div class="nav-group">
        <!--移动端的菜单图标-->
        <a class="nav-item">
          <span class="icon-list-unordered"></span>
        </a>
      </div>
      <h1 class="title-page">
        <span class="title-wrapper">{{todo.title}}</span>
        <!-- 标题-->
        <span class="count-list">{{todo.count || 0}}</span>
        <!-- 数目-->
      </h1>
      <div class="nav-group right">
        <!-- 右边的删除，锁定图标容器-->
        <div class="options-web">
          <a class="nav-item">
            <!-- 锁定图标-->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else></span>
          </a>
          <a class="nav-item">
            <!-- 删除图标-->
            <span class="icon-trash"></span>
          </a>
        </div>
      </div>

      <div class="form todo-new input-symbol">
        <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
        <input
          type="text"
          v-model="text"
          placeholder="请输入"
          @keyup.enter="onAdd"
          :disabled="todo.locked"
        />
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <!--容器下半部分-->
      <div v-for="item in items" :key="item.id">
        <!-- 这里`v-for`会循环我们在 `data`函数 事先定义好的 ’items‘模拟数据，循环后拿到单个对象，在通过prop把数据传输给子组件 item -->
        <item :item="item"></item>
      </div>
    </div>
  </div>
</template>
<script>
import item from './item'
import { getTodo, addRecord } from '../api/api'
export default {
  data () {
    return {
      todo: {
        // 详情内容
      },
      items: [
        // 代办单项列表
      ],
      text: '' // 新增代办单项绑定的值
    }
  },
  watch: {
    '$route.params.id' () {
      // 监听$route.params.id的变化，如果这个id即代表用户点击了其他的待办项需要重新请求数据。
      this.init()
    }
  },
  created () {
    // created生命周期，在实例已经创建完成，页面还没渲染时调用init方法。
    this.init()
  },
  methods: {
    onAdd () {
      // 当用户输入文字，并且回车时调用次方法。
      const ID = this.$route.params.id
      addRecord({ menuId: ID, title: this.text }).then(res => {
        this.text = ''
        this.init()
        // 请求成功后初始化
      })
    },
    init () {
      // 获取到 $route下params下的id,即我们在menus.vue组件处传入的数据。
      const ID = this.$route.params.id
      getTodo({ id: ID }).then(res => {
        let { id, title, count, isDelete, locked } = res.data.menuBar
        // 请求成功，拿到res.data.todo;在将record 赋值到代办单项列表，其它数据赋值到todo对象
        this.items = res.data.articleList
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDelete: isDelete
        }
      })
    }
  },
  components: {
    item // 引入右边下方的内容
  }
}
</script>
<style lang = "less">
@import "../common/style/nav.less";
@import "../common/style/form.less";
@import "../common/style/todo.less";
</style>
