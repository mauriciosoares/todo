// adds the event listener to the buttons
var addTodoBt = document.getElementById('addTodoBt');
addTodoBt.addEventListener('click', todo.addTodo);

var clearCurrentTodos = document.getElementById('clearCurrentTodos');
clearCurrentTodos.addEventListener('click', todo.clearTodos);

var clearUncheckedTodos = document.getElementById('clearUncheckedTodos');
clearUncheckedTodos.addEventListener('click', todo.clearUncheckedTodos);



// adds an event listener to the check and delete
document.querySelector('body').addEventListener('click', function(e) {
	if(e.target.className === 'delete'){
		todo.removeTodo(e.target.getAttribute('data-id'));
	}else if(e.target.className === 'check'){
		todo.checkTodo(e.target.getAttribute('data-id'));
	}
});

todo.init();