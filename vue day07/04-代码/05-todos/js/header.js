// 定义了头部组件
Vue.component('todos-header', {
  template: `
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" v-model="todoName" @keyup.enter="addTodo">
    </header>
  `,
  data() {
    return {
      todoName: ''
    }
  },
  props: ['list'],
  methods: {
    addTodo() {
      // 把todoName给父组件
      this.$emit('add', this.todoName)
      // this.list.unshift({
      //   id: +new Date(),
      //   name: this.todoName,
      //   flag: false
      // })
      // 清空内容
      this.todoName = ''
    }
  }
})