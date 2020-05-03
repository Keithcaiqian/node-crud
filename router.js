const express = require('express')
const fs = require('fs')

const Student = require('./student.js')
Student.updateById({
    id:1,
    name:'张小三'
},function(err){

})

// 1、创建一个路由容器
const router = express.Router()

// 2、把路由挂载到router路由容器中

router.get('/',function(req,res){
    res.redirect('/students')
})

// 查询所有学生
router.get('/students',function(req,res){
    Student.find(function(err,students){
        if(err){
            return res.status(500).send('server error')
        }
        res.render('index.html',{
            fruits:[{
                name:'黄瓜',
                desc:'黄色的'
            },{
                name:'菠萝',
                desc:'紫色的'
            },{
                name:'橘子',
                desc:'橙色色的'
            },{
                name:'西瓜',
                desc:'绿色的'
            }],
            students
        })
    })
})

// 渲染添加学生页面
router.get('/students/new',function(req,res){
    res.render('new.html')
})

// 提交新增学生
router.post('/students/new',function(req,res){
    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})

// 渲染修改学生页面
router.get('/students/edit',function(req,res){
    Student.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('server error')
        }
        res.render('edit.html',{
            student
        })
    })
})
// 处理修改学生
router.post('/students/edit',function(req,res){
    Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})
// 删除学生
router.get('/students/delete',function(req,res){
    Student.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})

// 3、导出
module.exports = router
