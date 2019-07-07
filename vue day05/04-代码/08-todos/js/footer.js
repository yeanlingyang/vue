// 底部组件
Vue.component('todos-footer', {
  template: `
    <footer class="footer" v-show="isShowFooter">
      <span class="todo-count"><strong>{{count}}</strong> item left</span>
      <ul class="filters">
        <li>
          <a class="selected" href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <button class="clear-completed" v-show="isShowClear" @click="clearTodo">Clear completed</button>
    </footer>
  `,
  props: ['list'],
  computed: {
    isShowFooter() {
      return this.list.length > 0
    },
    count() {
      return this.list.filter(item => !item.flag).length
    },
    isShowClear() {
      return this.list.some(item => item.flag)
    }
  },
  methods: {
    clearTodo() {
      // 干什么？？？
      // this.list = this.list
      // 触发事件
      this.$emit('clear-todo')
    }
  }
})