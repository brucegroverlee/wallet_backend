# Migration with Sequelize

## To create a migration
```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```
Where ``User`` is the table name, and ``firstName``, ``lastName`` and ``email`` are the columns.

Create an empty migration file.
```
npx sequelize-cli migration:generate --name {migration-name}
```

## To execute the migrations

To execute the migrations, where ``{env}`` is the environment (test, development, staging and production).
```
export NODE_ENV={env} && npx sequelize-cli db:migrate
// or
export NODE_ENV=test.local && npx sequelize-cli db:migrate
export NODE_ENV=test && npx sequelize-cli db:migrate
export NODE_ENV=development && npx sequelize-cli db:migrate
export NODE_ENV=staging && npx sequelize-cli db:migrate
export NODE_ENV=production && npx sequelize-cli db:migrate
```

## Undoing Migrations

Now our table has been created and saved in database. With migration you can revert to old state by just running a command.

You can use db:migrate:undo, this command will revert most recent migration.

```
export NODE_ENV={env} && npx sequelize-cli db:migrate:undo
```

You can revert back to initial state by undoing all migrations with db:migrate:undo:all command. You can also revert back to a specific migration by passing its name in --to option.

```
export NODE_ENV={env} && npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```

### Important
If you wanna change the credentials of th DB, you must change it at:
```
src/db/sequelize/config/config.json
```
The env files doesn't work at these tasks.

## References
- [Migration with sequelize](https://sequelize.org/v5/manual/migrations.html)