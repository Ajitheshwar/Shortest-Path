const exp = require("express")
const app = exp()
const path = require("path")
app.use(exp.static(path.join(__dirname,"game")))
const port = 4000
app.listen(port, ()=>{console.log(`App listening on port ${port}`)})
app.use(exp.json())

app.get("",async(req,res,next)=>{
    res.sendFile(path.join(__dirname+'/game/game.html'))
})