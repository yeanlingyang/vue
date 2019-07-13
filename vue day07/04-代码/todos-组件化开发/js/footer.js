Vue.component('todos-footer',{
  template:`
    <footer class="footer" v-show='isFooter'>
    <span class="todo-count"><strong>{{ count }}</strong> item left</span>
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
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed" v-show= 'clearCom' @click='clearMov'>Clear completed</button>
  </footer>
  
  `,
  props:['list'],
  methods: {
    clearMov () {
      this.$emit('clear')
    }
  },
  computed: {
    isFooter() {
     return this.list.length > 0
    },
    count () {
      return this.list.filter(item=>!item.flag).length
    },
    clearCom() {
      return this.list.some(item=>item.flag)
    }
  }
})