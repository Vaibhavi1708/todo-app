const db = require("../models");
console.log(db)
const Todo = db.todos;

// Create and Save a new Todo
exports.create = (req, res) => {
    //Validate request
    if(!req.body.title){
        res.status(400).send({message:'Content cannot be empty!'});
        return;
    }

    //Create a todo
    const todo = new Todo({
        title:req.body.title,
        description:req.body.description,
        completed:req.body.completed ? req.body.completed:false
    });

    //Save todo in database
    todo
    .save(todo)
    .then(data =>{
        res.send(data);
    })
    .catch (err =>{
        res.status(500).send({
            message:
            err.message || 'Some error occured while creating the todo'
        });
    });
  
};

// Retrieve all Todo from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: 'i'}} : {};

    Todo.find(condition)
    .then(data =>{
        res.send(data);
    })
    .catch (err =>{
        res.status(500).send({
            message:
            err.message || 'Some error occured while retrieving todos.'
        });
    });
  
};



// Find a single Todo with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Todo.findById(id)
    .then(data =>{
        if(!data)
            res.status(400).send({message:'Not found todo with id: '+id});
        else res.send(data);
    })
    .catch (err =>{
        res
        .status(500)
        .send({ message:'Some error occured while retrieving todo with id: '+id});
    });
  
};


// Update a Todo by the id in the request
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message:'Data to update cannot be empty!'});
        
    }
    const id = req.params.id;

    Todo.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data =>{
        if(!data)
            res.status(400).send({
                message:'Cannot update todo with id: '+id});
        else res.send({message:'Todo was updated successfully!'});
    })
    .catch (err =>{
        res
        .status(500)
        .send({ message:'Some error occured while updating todo with id: '+id});
    });
  
};

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndDelete(id, {useFindAndModify:false})
    .then(data =>{
        if(!data)
            res.status(400).send({
                message:'Cannot delete todo with id: '+id});
        else res.send({message:'Todo was deleted successfully!'});
    })
    .catch (err =>{
        res
        .status(500)
        .send({ message:'Some error occured while deleting todo with id: '+id});
    });
  
};

// Delete all Todos from the database.
exports.deleteAll = (req, res) => {
    Todo.deleteMany({})
    .then(data =>{
        res.send({
            message:`${data.deletedCount} Todos are deleted successfully!`
        });
    })
    .catch (err =>{
        res.status(500).send({
            message:
            err.message || 'Some error occured while removing all todos.'
        });
    });
  
};

// Find all completed todos 
exports.findAllCompleted = (req, res) => {
    Todo.findAllCompleted({completed:true})
    .then(data =>{
        res.send(data);
    })
    .catch (err =>{
        res.status(500).send({
            message:
            err.message || 'Some error occured while retrieving todos.'
        });
    });
  
};