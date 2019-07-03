/* 
	功能1： 初始化vue
		new Vue,指定el和data

	功能2： 任务列表的展示
		1. 使用v-for指令把列表动态渲染 ,, 指定key
		2. 内容写死了，  使用插值表达式或者v-text完成  {{item.name}}
		3. 任务完成状态  通过控制completed类型  :class="{completed: item.flag}"
		4. 复选框选中的问题   <input class="toggle" type="checkbox" v-model="item.flag">

	功能3： 删除
		1. 给删除按钮注册点击事件
		2. 获取到删除任务id
		3. 根据id把list中对应的任务删除即可

	功能4：添加
		1. 获取到输入的内容
		2. 要注册keyup事件，回车的时候添加任务
		3. 把获取到内容添加到list中，最前面
*/
(function (window) {
	const vm = new Vue({
		// 指定视图
		el: '.todoapp',
		data: {
			// 任务列表
			list: [
				{ id: 1, name: '吃饭', flag: true },
				{ id: 2, name: '睡觉', flag: false },
				{ id: 5, name: '打pp', flag: true }
			],
			todoName: ''
		},
		methods: {
			delTodo(id) {
				// 先根据id找到下标
				// findIndex: 返回第一个满足条件的下标
				// find: 返回第一个满足条件的元素
				// const idx = this.list.findIndex(item => item.id === id)
				// console.log(idx)
				// 根据下标删除对应的元素
				// this.list.splice(idx, 1)

				// 一行代码
				// 过滤  只要把id不同留下来
				this.list = this.list.filter(item => item.id !== id)
			},
			addTodo() {
				// console.log(this.todoName)
				// 把todoName添加到list中
				this.list.unshift({
					id: +new Date(),
					name: this.todoName,
					flag: false
				})
				this.todoName = ''
			}
		}
	})

	window.vm = vm
})(window);
