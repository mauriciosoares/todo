var todo = (function() {
	'use strict';

	var todos = [],
		todoList = document.getElementById('todo');

	function init() {
		refreshTodos();
	}

	function refreshTodos() {
		todoList.innerHTML = '';
		console.log(todos);

		todos.forEach(function(element, index){
			var todo = document.createElement('li'),
				todoDeleteBt,
				todoCheckBt;
			todo.id = index;
			todo.innerText = element.text;

			todoDeleteBt = document.createElement('input');
			todoDeleteBt.setAttribute('type', 'button');
			todoDeleteBt.setAttribute('value', 'X');
			todoDeleteBt.setAttribute('data-id', index);
			todoDeleteBt.className = 'delete';
			todo.appendChild(todoDeleteBt);

			todoCheckBt = document.createElement('input');
			todoCheckBt.setAttribute('type', 'checkbox');
			todoCheckBt.setAttribute('data-id', index);
			todoCheckBt.className = 'check';
			todo.appendChild(todoCheckBt);

			if(element.checked === 1){
				todo.className = 'checked';
				todoCheckBt.setAttribute('CHECKED');
			}


			todoList.appendChild(todo);
		});
	}

	function addTodo() {
		var newTodo = document.getElementById('newTodoInput');
		todos.push({text: newTodo.value, checked: 0});
		newTodo.value = '';
		refreshTodos();
	}

	function removeTodo(id) {
		todos.splice(id, 1);
		refreshTodos();
	}

	function checkTodo(id) {
		var checkedTodo = document.getElementById(id);
		if(!checkedTodo.classList.contains('checked')){
			checkedTodo.classList.add('checked');
			todos[id].checked = 1;
		}else{
			checkedTodo.classList.remove('checked');
			todos[id].checked = 0;
		}
	}

	return {
		init: init,
		addTodo: addTodo,
		removeTodo: removeTodo,
		checkTodo: checkTodo
	};
}());

todo.init();

var addTodoBt = document.getElementById('addTodoBt');
addTodoBt.addEventListener('click', todo.addTodo);

document.querySelector('body').addEventListener('click', function(e) {
	if(e.target.className === 'delete'){
		todo.removeTodo(e.target.getAttribute('data-id'));
	}else if(e.target.className === 'check'){
		todo.checkTodo(e.target.getAttribute('data-id'));
	}
});