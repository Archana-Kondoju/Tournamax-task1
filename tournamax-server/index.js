const express = require('express')
const app = express()
const cors= require('cors')
const port = process.env.PORT || 3000;
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'none'; img-src 'self' https://tournamax-task1-apii.vercel.app");
  next();
});

require('dotenv').config()
const allowedOrigins = ['https://tournamax-task1-ui.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Optional: Ensure preflight requests are handled
app.options('*', cors());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const db=client.db("toDoList")
    const todoList=db.collection("todoList")

    app.post("/",async(req,res)=>{
      const body=req.body;
      body.createAt=new Date();
      console.log(body);
      const result=await todoList.insertOne(body)
      if(result.insertedId){
        return res.status(200).send(result);
      }
      return res.status(404).send({message:"can not add! try again later",
                                  status:false});
    })

    app.get("/", async (req, res) => {
        try {
            const todos = await todoList.find({}).toArray();
            res.json(todos);
        } catch (error) {
            console.error('Error fetching todos:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    });
    
    app.put("/:id", async (req, res) => {
        const id = req.params.id;
        const { task, descr } = req.body;
        try {
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    task: task,
                    descr: descr
                }
            };
            const result = await todoList.updateOne(filter, updateDoc);
            if (result.modifiedCount > 0) {
                res.json({ acknowledged: true });
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });

    app.get('/:id', async (req, res) => {
        try {
            const taskId = req.params.id;
            const task = await todoList.findOne({ _id: new ObjectId(taskId) });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            console.error('Error fetching task:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    });
    
    app.delete("/:id",async(req,res)=>{
      const id=req.params.id;
      const filter={_id: new ObjectId(id)};
      const result=await todoList.deleteOne(filter);
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {}
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
