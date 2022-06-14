const exp = require("express")
const app = exp()
const path = require("path")
app.use(exp.static(path.join(__dirname,"game")))

require("dotenv").config()
const port = process.env.PORT
app.listen(port, ()=>{console.log(`App listening on port ${port}`)})
app.use(exp.json())

app.get("",async(req,res,next)=>{
    res.sendFile(path.join(__dirname+'/game/game.html'))
})