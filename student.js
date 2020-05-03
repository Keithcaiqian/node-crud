/**
 * student.js 只用来操作数据
 */
const fs = require('fs')
const dbPath = './db.json'

 /**
  * 获取所有学生
  */
 exports.find = function(callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
           return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
 }

/**
 * 根据ID获取学生
 */
 exports.findById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students
        let stu = students.find(item=>{
            return item.id === parseInt(id) 
        })
        callback(null,stu)
    })
 }

 /**
  * 添加保存学生
  */
 exports.save = function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students

        student.id = students[students.length - 1].id + 1

        students.push(student)
        let fileData = JSON.stringify({
            students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
 }

 /**
  * 更新学生数据
  */
 exports.updateById = function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students
        student.id = parseInt(student.id)
        let stu = students.find(item=>{
            return item.id === student.id
        })
        for (const key in student) {
            stu[key] = student[key]
        }

        let fileData = JSON.stringify({
            students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
 }

 /**
  * 删除学生
  */
 exports.deleteById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students
        let stuIndex = students.findIndex(item=>{
            return item.id === parseInt(id)
        })
        
        students.splice(stuIndex,1)

        let fileData = JSON.stringify({
            students
        })

        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
 }