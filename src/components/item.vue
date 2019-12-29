<template>
  <div class="list-item editingClass editing">
    <!-- 最外层容器-->
    <label class="checkbox">
      <!--自定义的多选框-->
      <input type="checkbox" v-model="item.checked" />
      <!--item.checked-->
      <span class="checkbox-custom"></span>
    </label>
    <input type="text" v-model="item.title" placeholder="写点什么。。。" />
    <!--绑定item.text-->
    <a class="delete-item">
      <!--删除图标-->
      <span class="icon-trash"></span>
    </a>
  </div>
</template>
<script>
// item 是todo的子组件,他接受一个对象item,来进行处理
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return ''
      }
    }
  }
}
</script>
<style lang="less">
@import "../common/style/list-items.less";
</style>
