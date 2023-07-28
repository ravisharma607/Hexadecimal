const express = require("express");
const app = express()


app.get('/users', (req, res) => {
    try {
        const data = fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                if (!response.ok) {
                    res.status(400).json({ message: 'An Error' })
                }
                return response.json()
            })
            .then((data) => {
                res.send(data)
            })
    }
    catch (e) {
        res.status(400).json({ message: 'An Error' })
    }
})


app.get('/', (req, res) => {
    res.send('Welcoe Home')
})

app.listen(8000, () => {
    console.log('Server Is Runing On 8000');
})