const mongoose=require('mongoose')
 
 const Blogs=mongoose.model('Blogs',{
        title:{
            type:String,
            
        },
        description:{
            type:String
        },
        category:{
            type:String,
            require:true
            
    }});
    
    
module.exports=Blogs