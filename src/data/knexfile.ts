module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/data/auth.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/data/migrations',
    },
    seeds: {
      directory: './src/data/seeds',
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
