FROM mysql:latest

RUN mkdir /app && chown mysql:mysql /app
USER mysql
WORKDIR /app
COPY ./ddl/* /docker-entrypoint-initdb.d/
COPY ./dml/* /docker-entrypoint-initdb.d/
COPY ./procedures/* /docker-entrypoint-initdb.d/