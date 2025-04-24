import * as mysql from 'mysql'

const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database: 'nodedb'
}

let connected = false

/**
 *
 * @param {() => void} callback
 * @returns
 */
function connect(callback) {
	if (connected) {
		callback()
		return
	}

	const connection = mysql.createConnection(config)
	connection.query(
		`CREATE TABLE IF NOT EXISTS people (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL UNIQUE,
			PRIMARY KEY (id)
        );`,
		(error) => {
			if (error) {
				throw error
			}
			connection.end()
			connected = true
			callback()
		}
	)
}

/**
 *
 * @param {(error: string | null, result: string[] | null) => void} callback
 */
export function getAll(callback) {
	connect(() => {
		const connection = mysql.createConnection(config)
		connection.query(
			`SELECT * FROM people`, //
			(error, values) => {
				if (error) {
					console.error(error.sqlMessage)
					callback(error.sqlMessage, null)
				} else {
					callback(
						null,
						values.map((value) => value.name)
					)
				}
			}
		)
	})
}

/**
 *
 * @param {string} name
 * @param {(error: string | null) => void} callback
 */
export function insert(name, callback) {
	connect(() => {
		const connection = mysql.createConnection(config)
		connection.query(
			`INSERT INTO people(name) values('${name}');`, //
			(error) => {
				if (error) {
					console.error(error.sqlMessage)
					callback(error.sqlMessage)
				} else {
					callback(null)
				}

				connection.end()
			}
		)
	})
}
