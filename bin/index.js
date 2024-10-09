import fs from "fs"
import express from 'express'

const http = new express()

http.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", "*");
    next()
})


http.get("/", (req, res) => {
    fs.readFile("./kjv.json", "utf8", (err, files) => {
        const datas = JSON.parse(files)
        const verses = datas?.verses
        res.send(verses)
    })
})


http.get("/list", (req, res) => {
    fs.readFile("./kjv_list.json", "utf8", (err, files) => {
        const datas = JSON.parse(files)
        res.send({ status: true, list: datas, len: datas?.length})
    })
})


http.get("/l", (req, res) => {
    fs.readFile("./kjv_list.json", "utf8", (err, files) => {
        const datas = JSON.parse(files)
        res.send({ status: true, list: datas, len: datas?.length })
    })
})



http.post("/:book", (req, res) => {
    const { book } = req.params
    
    fs.readFile("./kjv.json", "utf8", (err, files) => {
        const datas = JSON.parse(files)
        const verses = datas?.verses

        const queryData = verses?.filter((data, index) =>  data?.book_name.toLowerCase() === book)
       
        res.send({bok_name: book, data: queryData})
    })
})



const port = process.env.PORT || 9559

http.listen(port, (err, _) => {
    if (err) {
        throw err
    }

    console.log(`running::${port}`)
})