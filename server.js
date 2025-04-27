const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/tasknest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Task = mongoose.model('Task', {
    text: String
});

app.get('/', (req, res) => {
    res.send(`
        <h1>TaskNest - Simple To-Do App</h1>
        <input id="taskInput" placeholder="Enter task" />
        <button onclick="addTask()">Add Task</button>
        <ul id="taskList"></ul>

        <script>
            async function fetchTasks() {
                const res = await fetch('/api/tasks');
                const tasks = await res.json();
                document.getElementById('taskList').innerHTML = tasks.map(task => 
                    \`<li>\${task.text} <button onclick="deleteTask('\${task._id}')">Delete</button></li>\`
                ).join('');
            }
            async function addTask() {
                const text = document.getElementById('taskInput').value;
                await fetch('/api/tasks', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ text }) });
                document.getElementById('taskInput').value = '';
                fetchTasks();
            }
            async function deleteTask(id) {
                await fetch('/api/tasks/' + id, { method: 'DELETE' });
                fetchTasks();
            }
            fetchTasks();
        </script>
    `);
});

app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
    const task = new Task({ text: req.body.text });
    await task.save();
    res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
