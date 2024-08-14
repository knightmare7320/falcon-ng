export DATABASE_URL="postgresql://(username):(password)@127.0.0.1:5432/falcon"
export DATABASE_URL=mysql://(username):(password)@127.0.0.1:3306/falcon

npx prisma migrate dev --name "init"
npx prisma generate
npx prisma studio