Vue.component('todos-main',{
  template :`
  <section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<li v-for ='item in list' :key='item.id' :class="{completed:item.flag,editing:item.id===editId}">
						<div class="view">
							<input class="toggle" type="checkbox" :checked ='item.flag' @change='changeState(item.id)'>
							<label @dblclick= 'showEdit(item.id)'>{{ item.name }}</label>
							<button class="destroy" @click='delTodo(item.id)'></button>
						</div>
						<input class="edit" :value='item.name'  @keyup.enter='updateTodo'>
					</li>
				</ul>
			</section>
	`,
	props :['list'],
	data () {
		return {
			editId :-1
		}
	},
	methods: {
		delTodo(id) {
			this.$emit('del',id)
		},
		showEdit(id) {
			this.editId=id
		},
		updateTodo(e) {
			// 还应该把任务的id和任务的name发送给父组件
			// 事件对象e.target指定就是事件源
			// 当前的input框的value值
			this.$emit('update-todo', this.editId,e.target.value)
			// 隐藏input框
			this.editId = -1
		},
		changeState(id) {
			this.$emit('state',id)
		}
	}
})