// 定义了一个main组件
/* 
	父组件要把list传递给main组件
		props: ['list']   根组件，我需要list的数据
		<todos-main :list="list"></todos-main>
*/
Vue.component('todos-main', {
	template: `
		<section class="main">
			<input id="toggle-all" class="toggle-all" type="checkbox">
			<label for="toggle-all">Mark all as complete</label>
			<ul class="todo-list">
				<li v-for="item in list" :key="item.id" :class="{completed: item.flag, editing: item.id === now}">
					<div class="view">
						<input class="toggle" type="checkbox" @change="changeState(item.id)" :checked="item.flag">
						<label @dblclick="showEdit(item.id)">{{item.name}}</label>
						<button class="destroy" @click="delTodo(item.id)"></button>
					</div>
					<input class="edit" :value="item.name" @keyup.enter="updateTodo">
				</li>
			</ul>
		</section>
	`,
	props: ['list'],
	data() {
		return {
			now: -1
		}
	},
	methods: {
		delTodo(id) {
			// 切记：不要在子组件中去修改父组件传递过来的数据
			// 应该把需要删除的任务id传递给父组件，让父组件自己来删
			this.$emit('del', id)
		},
		changeState(id) {
			// 把id发送给父组件，让父组件修改状态
			// console.log(id)
			this.$emit('change-state', id)
		},
		showEdit(id) {
			this.now = id
		},
		updateTodo(e) {
			// 还应该把任务的id和任务的name发送给父组件
			// 事件对象e.target指定就是事件源
			// 当前的input框的value值
			this.$emit('update-todo', this.now, e.target.value)
			// 隐藏input框
			this.now = -1
		}
	}
})
