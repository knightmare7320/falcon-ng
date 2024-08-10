export DATABASE_URL="postgresql://prisma:prisma@127.0.0.1:5432/falcon"

npx prisma migrate dev --name "init"
npx prisma generate
npx prisma studio