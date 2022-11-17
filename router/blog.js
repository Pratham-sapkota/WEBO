const express=require('express')
const router=new express.Router()
const Blogs=require('../models/blog')

router.post('/blog', async (req,res)=>{
    const blog= new Blogs(req.body)
    try{
        await blog.save()
        res.send(blog)
    }catch(e){
        res.status(400).send(e)
    }
    
})



router.get('/blog',async (req,res)=>{
    try{
        const blog=await Blogs.find({})
        res.send(blog)
    }catch(e){
        res.status(500).send(e)
    }
    
})

router.get('/blog/:id',async (req,res)=>{
    const _id=req.params.id
    try{
        const blog=await Blogs.findById(_id)
        if(!blog){
            return res.status(404).send()
        }
        res.send(blog)

    }catch(e){
        res.status(500).send
    }
   
})

router.patch('/blog/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['title','description','category']
    const isValidUpdate=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(404).send({error:"invalid updates"})
    }
    try{
        const blog=await Blogs.findById(req.params.id)
        updates.forEach((update)=>blog[update]=req.body[update])
        await blog.save()
        if(!blog){
            return res.status(404).send()
        }
        res.send(blog)
    }catch(e){
        res.status(400).send(e)

    }
})

router.delete('/blog/:id',async(req,res)=>{
    try{
        const blog = await Blogs.findByIdAndDelete(req.params.id)
        if(!blog){
            return res.status(400).send()
        }
        res.send(blog)
    }catch(e){
        res.status(500).send(e)
    }
})



module.exports=router