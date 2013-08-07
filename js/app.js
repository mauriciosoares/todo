requirejs.config({
    shim: {
        'main': {
            deps: ['ls', 'todo']
        },
        'todo': {
            deps: ['ls']
        }
    }
});

// Start the main app logic.
requirejs(['main', 'todo', 'ls']);