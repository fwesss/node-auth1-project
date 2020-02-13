import knex from 'knex'

const config = require('../knexfile.ts').development

export default knex(config)
