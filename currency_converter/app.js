import https from 'https'
import readline from 'readline'
import chalk from 'chalk'
const apiKey = "adbc009ead8f4f35187f5ebc"

const rl = readline.createInterface(
    {input:process.stdin,
    output:process.stdout}
)

let data = ""

const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
function convert(){
    rl.question("Enter the amount in USD: ",(enteredAmount)=>{
        rl.question("Enter the target currency (e.g., INR, PKR, EUR: ", (targetCurrency)=>{
            targetCurrency = targetCurrency.toUpperCase()
            https.get(url,(res)=>{
                res.on("data",(chunk)=>{
                    data += chunk
                })
                res.on("end",()=>{
                    let apiResponse = JSON.parse(data)
                    console.log("Amount after conversion: ")
                    console.log(chalk.green.bgCyan.bold(`${targetCurrency} `+ enteredAmount * apiResponse.conversion_rates[targetCurrency]))
                    rl.close()
                })
                res.on("error",(err)=>{
                    console.log(err.message)
                    rl.close()
                })
            })
        })
    })
    
}

convert()
