const exp = require("express")
const app = exp()
const path = require("path")
app.listen(port, ()=>{console.log(`App listening on port ${port}`)})
app.use(exp.json())

app.get("",async(req,res,next)=>{
    res.render(path.join(__dirname+'/game.html'))
})