import Knex, { QueryBuilder } from 'knex'

exports.seed = (knex: Knex): QueryBuilder =>
  knex('users').insert([
    {
      username: 'BurritoMan',
      password: '$2b$10$5pTqYGeCvoGeTEL10n9zveFuldD3XS/CrGFtzDtAUQsg2IxcnaIu2',
    },
    {
      username: 'Poptart',
      password: '$2b$10$aKD4/XJMc7Fg7Gm/hJDM8eas0WiazbOeJMmh3K68lsaeMkWIl7HKm',
    },
    {
      username: 'Orangejuice',
      password: '$2b$10$KROHHaDwvrhQmW0z207/c.zfU1Iu1WG4Er01T7S5u5usMKRSOWth6',
    },
  ])
