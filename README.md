#  Disaster Management

##  Steps to follow in local system
- Clone the repo:
```git clone https://github.com/MashukeAlam/disaster-management.git```

```cd disaster-management```
- Fill in the environment variables

```cp env.sample .env```

-- Sample .env
```DB_NAME=disaster
DB_USER=root
DB_PASSWORD=root
DB_HOST=localhost
DB_DIALECT=mysql
```
*Make sure your mysql user has all privileges to create and maintain a database and its tables.*

- Use latest Node Version
```nvm install --lts```
or
```nvm use 20.17.0```
- Run NPM Install:
```npm i```
- Run NPM install for Angular
```cd frontend && npm i```
- Run the seeds for backend:
- Please run the seed for admin twice.

```npm run seed:admin```

```npm run seed:admin```

```npm run seed:item```

```npm run seed:locations```

```npm run seed:crisis_type```

```npm run seed:merchant```
- Start the servers:
To continue without building Angular:

```npm start```

```cd frontend && ng serve```
