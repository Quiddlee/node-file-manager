import greetings from './views/grettings.js';
import exit from './views/exit.js';

greetings();

process.on('exit', exit);
