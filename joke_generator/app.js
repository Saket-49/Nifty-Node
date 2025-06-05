import chalk from 'chalk';
import https from 'https';

function getJoke() {
  const url = 'https://official-joke-api.appspot.com/random_joke';
  https.get(url, (res)=>{
    try{
        let data = ""
    res.on('data',(chunk)=>{
        data += chunk
    })
    res.on("end",()=>{
        const joke = JSON.parse(data)
        console.log(`Here is a random joke:`)
        console.log(chalk.green(`${joke.setup}`))
        console.log(chalk.blue.bgRed.bold(`${joke.punchline}`))
    })
    }
    catch{
        res.on("error",(err)=>{
        console.log("an error occured")
    })
    }
    
  })

}   


getJoke()