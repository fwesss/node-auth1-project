import session from 'express-session'
import knexSessionStore from 'connect-session-knex'
import db from '../../data/dbConfig'

const ConnectedSessionStore = knexSessionStore(session)

export default {
  name: 'tuna',
  secret: 'big poofer',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: Boolean(process.env.SECURE) || false,
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,

  store: new ConnectedSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
}
