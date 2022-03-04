const express = require('express')
const router = express.Router();
const { Employees } = require('../models/employees') 
const Redis = require('ioredis');
const redis =new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    // family: 4, // 4 (IPv4) or 6 (IPv6)
    // db: 0,
})

router.get('/api/employees',(req,res)=>{
    Employees.find({},(err, data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log(err);
        }
    })
    // redis
    try {
        redis.get('user1', function (err, reply) {
            var stringAsJson = JSON.parse(reply);
            console.log(stringAsJson);
        });
        
      } catch (err) {
        res.status(500).send({ error: err.message });
      }

})

router.post('/api/employees/add',async(req,res)=>{
    const emp = new Employees({
        name:req.body.name,
        email:req.body.email,
        salary:req.body.salary
    })
    emp.save((err,data)=>{
        res.status(200).json({code:200,message:'Employee added successfully',addEmployee:data})
    })
    const userDetail = JSON.stringify(emp)
    redis.set('user1',userDetail,function(err,reply){
        console.log(reply);
    })
    //elasric
})

router.get('/api/employees/:id',((req,res)=>{
    Employees.findById(req.params.id,(err,data)=>{
        if(!err){
            res.send(data)
        }else{
            console.log(err);
        }
    })
}))
router.put('/api/emloyees/:id',(req,res)=>{
    const emp = {
        name:req.body.name,
        email:req.body.email,
        salary:req.body.salary
    }
    Employees.findByIdAndUpdate(req.params.id, {$set:emp},{new:true},(err,data)=>{
        if(!err){
            res.status(200).json({code:200,message:'Employee added successfully',updateEmployee:data})
        }else{
            console.log(err);
        }
    })
})
router.delete('/api/employees/:id',(req,res)=>{
    Employees.findByIdAndRemove(req.params.id,(err,data)=>{
        if(!err){
            res.status(200).json({code:200,message:'Employee removed successfully',deleteEmployee:data})
        }else{
            console.log(err);
        }
    })
})
module.exports =router;