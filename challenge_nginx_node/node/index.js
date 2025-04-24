import express from 'express'
import { getAll, insert } from './service.js'

const app = express()
const port = 3000

/**
 *
 * @param {string} errorHtml
 * @param {string} listHtml
 * @returns {string}
 */
function h1Html(errorHtml, listHtml) {
	return `
		<body style="background: black;">
			<main style="color: white; margin: auto; padding-top: 2em; width: fit-content;">
				<h1>Full Cycle Rocks!</h1>
				<form action="#">
					<input id="name" name="name" required type="text" />
					<input type="submit" />
				</form>
				<span style="color: red;">
					${errorHtml}
				</span>
				<ol>
					${listHtml}
				</ol>
			</main>
		</body>
	`
}

/**
 *
 * @param {string[]} names
 * @returns {string}
 */
function listHtml(names) {
	return names.reduce((acc, value) => {
		return acc + `<li>${value}</li>`
	}, '')
}

app.get('/', (req, res) => {
	const name = req.query.name

	if (name) {
		insert(name, (errorInsert) => {
			getAll((error, result) => {
				res.send(
					h1Html(
						errorInsert ?? error ?? '', //
						listHtml(result ?? [])
					)
				)
			})
		})
	} else {
		getAll((error, result) => {
			if (error) {
				res.send(
					h1Html(
						error, //
						''
					)
				)
			} else {
				res.send(
					h1Html(
						'', //
						listHtml(result ?? [])
					)
				)
			}
		})
	}
})

app.listen(port, () => {
	console.log('Rodando na porta ' + port)
})
