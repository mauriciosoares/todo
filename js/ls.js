var ls = (function() {
	'use strict';

	// alocates all todos from localstorage into a main variable
	var allTodos;

	function getAll() {
		// get all todos array, then calls the fetch function, as it is just a json
		allTodos = localStorage.getItem('todos');
		fetch();
	}

	function update(todos) {
		// updates the localstorage with the todos parameter
		// it receives an array of objects, i transform it into a json, than i store it
		var jsonTodos = JSON.stringify(todos);
		localStorage.setItem('todos', jsonTodos);
	}

	// receives a json from localstorage, transforms it into an array of objects,
	// and set the todos variable from todos class
	function fetch() {
		if(allTodos){
			allTodos = JSON.parse(allTodos);
			todo.setAllTodos(allTodos);
		}
	}

	return {
		getAll: getAll,
		update: update
	};
}());