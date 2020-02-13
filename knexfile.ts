module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/auth.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      afterCreate: (
        conn: { run: (connection: string, cb: () => void) => void },
        done: () => void
      ): void => {
        conn.run('PRAGMA foreign_keys = ON', done)
      },
    },
  },
}
