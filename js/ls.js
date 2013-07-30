var ls = (function() {
	'use strict';

	// alocates all todos from localstorage into a main variable
	var allTodos;
	var allStashTodos;

	function getAll() {
		// get all todos array, then calls the fetch function, as it is just a json
		allTodos = localStorage.getItem('todos');
		allStashTodos = localStorage.getItem('stashTodos');
		fetch();
	}

	function update(todos, stashTodos) {
		// updates the localstorage with the todos parameter
		// it receives an array of objects, i transform it into a json, than i store it
		var jsonTodos = JSON.stringify(todos);
		localStorage.setItem('todos', jsonTodos);

		if(stashTodos) {
			var jsonStashTodos = JSON.stringify(stashTodos);
			localStorage.setItem('stashTodos', jsonStashTodos);
		}
	}

	// receives a json from localstorage, transforms it into an array of objects,
	// and set the todos variable from todos class
	function fetch() {
		var allTodosV = null;
		var allStashTodosV = null;
		if(allTodos){
			allTodosV = JSON.parse(allTodos);
			
		}

		if(allStashTodos){
			allStashTodosV = JSON.parse(allStashTodos);
		}

		todo.setAllTodos(allTodosV, allStashTodosV);
	}

	return {
		getAll: getAll,
		update: update
	};
}());