const express = require('express')
const app = express()
const port = 3000
const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)
connection.query(
	`CREATE TABLE IF NOT EXISTS people (
		name VARCHAR(255) NOT NULL UNIQUE
	);`,
	(error) => {
		if (error) {
			console.error(error)
		}
	}
)
connection.end()

app.get('/', (req, res) => {
	const name = req.query.name ?? 'Wesley'
	const connection = mysql.createConnection(config)
	connection.query(
		`INSERT INTO people(name) values('${name}');`, //
		(error) => {
			if (error) {
				console.error(error)
				connection.end()
				res.send(`<h1>Error</h1><h2>${error.sqlMessage}</h2>`)
				return
			}

			connection.query(
				`SELECT * FROM people`, //
				(error, values) => {
					if (error) {
						console.error(error)
						connection.end()
						res.send(`<h1>Error</h1><h2>${error.sqlMessage}</h2>`)
						return
					}

					const result = values
						.map((value) => value.name)
						.reduce((acc, value, idx) => {
							return acc + `<li>${value}</li>`
						}, '')

					connection.end()
					res.send(`<h1>Full Cycle</h1><ol>${result}</ol>`)
				}
			)
		}
	)
})

app.listen(port, () => {
	console.log('Rodando na porta ' + port)
})
