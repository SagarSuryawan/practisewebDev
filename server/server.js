import app from './app.js';


const port = process.env.PORT || 5010
app.listen(port, async()=> {
    console.log(`Server is running at http://localhost:${port}`)
})
