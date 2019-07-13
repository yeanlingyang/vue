(function (window) {
	const vm = new Vue({
		el :'.todoapp',
		data : {
			list:[]
		},
		created() {
			this.list = JSON.parse(localStorage.getItem('todos'))||[]
		},
		watch: {
			list: {
				deep:true,
				handler (value) {
					localStorage.setItem('todos',JSON.stringify(value))
				}
			}
		},
		methods: {
			// 删除
			del(id) {
				this.list = this.list.filter(item=>item.id !==id)
			},
			add(todoName) {
				this.list.unshift({
					id:+new Date(),
					name :todoName,
					flag:false
				})
			},
			updateTodo(id, name) {
				const todo = this.list.find(item => item.id === id)
				todo.name = name
			},
			clear() {
				this.list= this.list.filter(item=> !item.flag)
			},
			state(id) {
				const todo = this.list.find(item=>item.id===id)
				todo.flag = !todo.flag
			}
		}
	})
})(window);
