import { QueryBuilder } from 'knex'
import db from '../../data/dbConfig'

type User = {
  username: string
  password: string
}

const find = (): QueryBuilder => db('users').select('id', 'username')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findBy = (filter: { [key: string]: any }): QueryBuilder =>
  db('users')
    .select('*')
    .where(filter)

const insert = (user: User): Promise<QueryBuilder> =>
  db('users')
    .insert(user, 'id')
    .then(ids => findBy({ id: ids[0] }).first())

export default { find, findBy, insert }
