const express = require("express");

const app = express();

const PORT = 3700;

app.use(express.json());

const todos = [];

app.get("/", (req, res) => {
    res.send("Todo Backend Running 🚀");
});

// Create Todo
app.post("/todos", (req, res) => {

    const todo = req.body;

    todos.push(todo);

    res.json({
        message: "Todo Added",
        todos
    });

});

// Read Todos
app.get("/todos", (req, res) => {

    res.json(todos);

});

// Delete Todo
app.delete("/todos/:id", (req, res) => {

    const id = req.params.id;

    todos.splice(id,1);

    res.json({
        message:"Deleted",
        todos
    });

});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});