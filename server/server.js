const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

const db = "mongodb+srv://daniel:momo1234@cluster0.swdhq.mongodb.net/caserobbyson?retryWrites=true&w=majority"

mongoose.connect(db, { useNewUrlParser:true, useUnifiedTopology: true})
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err))

const todoSchema = new mongoose.Schema({
    description:String,
    duedate:Date,
    done:{
        type:Boolean,
        default:false
    },
    hide:{
        type:Boolean,
        default:false
    },
})

const Todo = mongoose.model('todo', todoSchema);

app.get("/todos", (req, res)=>{
    Todo.find().then(todo=>res.json(todo))
})
app.get("/todos/:search", (req, res)=>{
    var search = req.params.search
    var replaceSearch = seach.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    Todo.find({description: new RegExp('^'+replaceSearch+'$', "i")}).then(todo=>res.json(todo));
})

app.post("/todos", (req, res)=>{
    const newTodo = new Todo({
        description:req.body.description,
        duedate:req.body.duedate
    })
    newTodo.save().then(todo => res.json(todo))
})

app.put("/todos/:id", (req, res)=>{
    const oldTodo = Todo.findByIdAndUpdate(req.params.id, {
        description: req.body.description,
        duedate: req.body.duedate,
        hide: req.body.hide, 
        done: req.body.done
    }).then(todo => res.json(todo));
})

app.delete("/todos/:id", (req, res)=>{
    Todo.findByIdAndDelete(req.params.id)
    .then(()=>res.json({ remove : true}))
})

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}!`)
})