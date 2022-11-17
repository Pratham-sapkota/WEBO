const express=require('express')
require('./db/mongoose')

const taskRouter=require('./router/blog')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())
app.use(taskRouter)



app.listen(port,()=>{
    console.log("Listening on port "+port)

})