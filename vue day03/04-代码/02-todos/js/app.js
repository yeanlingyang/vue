/* 
	1. 初始化vue
	2. 列表的渲染
	3. 删除功能
	4. 添加功能
	5. 修改功能
		5.1 给每一个lable都注册双击事件  dblclick
		5.2 让当前这个li有editing这个类, input框就能显示出来
		难点：怎么让点击的这个li有editing类
		5.3.1 首先需要一个属性，记录下来点击了任务的id ,初始 = -1 
		5.3.2 双击的时候，修改now 点击的任务的id  
		5.3.3 给li中的editing类添加判断  {edting: item.id === now}

		5.4.1 给input框双向数据绑定 <input class="edit" v-model="item.name">
		5.4.2 回车的时候，注册keyup事件 ，只需要editing类为false  只需要让now为-1
	
	6. 控制底部的显示和隐藏
		当任务列表的长度为0，没任务，底部就隐藏
		当任务列表的长度不为0，底部就显示

	7. 统计未完成的任务的数量

	8. 控制清空按钮的显示隐藏
		当有已经完成的任务，需要显示
		如果所有的任务都是没完成的，需要隐藏

	9. 点击清空按钮，把所有已经完成的任务清除


	10. 全选功能
		如果list中所有的任务flag都是true， 全选的checked就应该是true

	11. 任务列表的切换


	12： 数据持久化
		服务器存： ajax
		浏览器存： localStorage中

		什么时候存储数据？？？？？  只要能够修改list数据的操作都应该存。。。。
*/
(function (window) {
	const ALL = 1
	const ACTIVE = 2
	const COMPLETED = 3

	// 如果localStorage中没有数据，得保证是一个空数组
	let list = JSON.parse(localStorage.getItem('todos')) || []

	const vm = new Vue({
		el: '.todoapp',
		data: {
			list,
			todoName: '',
			// 用于记录点击任务的id
			now: -1,
			// 当前选中的底部
			current: 1
		},
		methods: {
			delTodo(id) {
				// 只要把list中id对应的任务过滤掉
				this.list = this.list.filter(item => item.id !== id)
			},
			addTodo() {
				this.list.unshift({
					id: +new Date(),
					name: this.todoName,
					flag: false
				})
				this.todoName = ''
			},
			// 显示修改框
			showEdit(id) {
				this.now = id
			},
			editTodo() {
				this.now = -1
			},
			clearTodo() {
				// 做什么？
				// 点击清空按钮，把所有已经完成的任务清除, 保留所有未完成的任务
				this.list = this.list.filter(item => !item.flag)
			},
			change(type) {
				this.current = type
			}
		},
		// 计算属性的值是不允许修改的？？？？？？
		// 为什么？？  不能计算属性使用v-model双向绑定
		computed: {
			isShowFooter() {
				// 当任务数量超过0，就显示footer
				return this.list.length > 0 
			},
			unCompletedCount() {
				return this.list.filter(item => !item.flag).length
			},
			isShowClear() {
				return this.list.some(item => item.flag)
			},
			// 是否是全选
			isCheckAll: {
				get() {
					return this.list.every(item => item.flag)
				},
				set(value) {
					// console.log(value)
					// 让list中所有任务的flag都和value一样
					this.list.forEach(item => item.flag = value)
				}
			},
			// 用于提供最终需要显示的数据  list 和 current
			showList() {
				if (this.current === ALL) {
					return this.list
				} else if (this.current === ACTIVE) {
					return this.list.filter(item => !item.flag)
				} else if (this.current === COMPLETED) {
					return this.list.filter(item => item.flag)
				}
			}
		},
		watch: {
			list: {
				deep: true,
				handler(value) {
					// 把value存储localStorage中
					localStorage.setItem('todos', JSON.stringify(value))
				}
			}
		}
	})
	window.vm = vm
})(window);
