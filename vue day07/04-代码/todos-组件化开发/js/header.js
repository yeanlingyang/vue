  Vue.component('todos-header',{
    template:`
    <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" v-model= 'todoName' @keyup.enter='addTodo'>
    </header>
    
    `,
    data() {
      return {
        todoName :''
      }
    },
    props :['list'],
    methods: {
      addTodo () {
        if(this.todoName==='') return
        this.$emit('add',this.todoName),
        this.todoName=''
      }
    }
  })