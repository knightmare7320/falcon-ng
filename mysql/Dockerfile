FROM mysql:9.0.1-oraclelinux9
WORKDIR /app
COPY ./ddl/* /docker-entrypoint-initdb.d
COPY ./dml/* /docker-entrypoint-initdb.d
COPY ./procedures/* /docker-entrypoint-initdb.d