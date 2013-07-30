var todo = (function() {
	'use strict';

	var todos = [],
		stashTodos = [],
		todosList = document.getElementById('todos'),
		stashTodosList = document.getElementById('stashTodos');

	// verify if localstorage has some data, and refresh the todos
	function init() {
		ls.getAll();
		refreshTodos();
	}

	// this function allows the ls class to access the todo's variable
	function setAllTodos(storagedTodos, storagedStashTodos) {
		if(storagedTodos) {
			todos = storagedTodos;
		}
		
		if(storagedStashTodos) {
			stashTodos = storagedStashTodos;
		}
	}

	// this function refreshes all the li's in the todo UL
	function refreshTodos(refreshStash) {
		var lsStashTodosList = null;
		todosList.innerHTML = '';

		// for each index of the todos array, it inserts an element into the dom
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


			todosList.appendChild(todo);
		});

		if(refreshStash || stashTodos.length != 0) {
			stashTodosList.innerHTML = '';

			stashTodos.forEach(function(element) {
				var todo = document.createElement('li');

				todo.innerText = element.text;

				stashTodosList.appendChild(todo);
			});
			lsStashTodosList = stashTodos;
		}

		// after the refresh, updates the localstorage accessing the ls class
		ls.update(todos, lsStashTodosList);
	}

	// inserts a new todo list, with the checked index to 0
	function addTodo() {
		var newTodo = document.getElementById('newTodoInput');
		todos.push({text: newTodo.value, checked: 0});
		newTodo.value = '';

		// refreshs the todo's list
		refreshTodos();
	}

	// removes a todo from the array
	function removeTodo(id) {
		todos.splice(id, 1);
		// refreshes the todo's list
		refreshTodos();
	}

	// updates the checked index of an todo into the todos array,
	// if its already checked as 1, it becomes 0
	function checkTodo(id) {
		var checkedTodo = document.getElementById(id);
		if(!checkedTodo.classList.contains('checked')){
			checkedTodo.classList.add('checked');
			todos[id].checked = 1;
		}else{
			checkedTodo.classList.remove('checked');
			todos[id].checked = 0;
		}

		// after it is checked, then access the localstorage class to update all the todos
		ls.update(todos);
	}

	function clearTodos() {
		todos = [];
		refreshTodos();
	}

	function clearUncheckedTodos() {
		for(var i = todos.length - 1; i >= 0; i--) {
			if(todos[i].checked === 0){
				todos.splice(i, 1);
			}
		}
		refreshTodos();
	}

	function stashCheckedTodos () {
		for(var i = todos.length - 1; i >= 0; i--) {
			if(todos[i].checked === 1){
				stashTodos.push(todos[i]);
				todos.splice(i, 1);
			}
		}
		refreshTodos(true);
	}

	function clearStashTodos() {
		stashTodos = [];
		refreshTodos(true);
	}

	return {
		init: init,
		addTodo: addTodo,
		removeTodo: removeTodo,
		checkTodo: checkTodo,
		setAllTodos: setAllTodos,
		clearTodos: clearTodos,
		clearUncheckedTodos: clearUncheckedTodos,
		stashCheckedTodos: stashCheckedTodos,
		clearStashTodos: clearStashTodos
	};
}());