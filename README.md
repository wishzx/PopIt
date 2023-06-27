The code repository of a fullstack app with the main objective of teaching junior developers would be a comprehensive resource that contains all the necessary components for building a web application from start to finish. The repository would be organized in a clear and logical manner, with each component and module of the application separated into its own directory or folder.


### Installation guide

install npx and by doing so npm and node 18

```bash
npm i
```

install postgresql locally or in cloud 

rename .env.example to .env and put there your db connection and a secret

create prisma skd

```bash
npx prisma migrate dev --name init
```

seed the db

```bash
npm run seed
```


```bash
npm run dev
```


