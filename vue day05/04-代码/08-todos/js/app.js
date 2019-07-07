(function (window) {
	// 根组件
	const vm = new Vue({
		el: '.todoapp',
		data: {
			list: []
		},
		created() {
			// 发送ajax请求获取数据
			// 直接从localStorage中获取数据
			this.list = JSON.parse(localStorage.getItem('todos')) || []
		},
		methods: {
			delTodo(id) {
				this.list = this.list.filter(item => item.id !== id)
			},
			addTodo(todoName) {
				this.list.unshift({
					id: +new Date(),
					name: todoName,
					flag: false
				})
			},
			changeState(id) {
				// 根据id找到对应的任务，让任务的状态取反
				const todo = this.list.find(item => item.id === id)
				// console.log(todo)
				// 让对应的任务取反
				todo.flag = !todo.flag
			},
			updateTodo(id, name) {
				const todo = this.list.find(item => item.id === id)
				todo.name = name
			},
			clearTodo() {
				this.list = this.list.filter(item => !item.flag)
			}
		},
		watch: {
			// 监听list的变化
			list: {
				deep: true,
				handler(value) {
					localStorage.setItem('todos', JSON.stringify(value))
				} 
			}
		}
	})

	window.vm = vm
})(window);
