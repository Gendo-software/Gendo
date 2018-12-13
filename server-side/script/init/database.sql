CREATE SCHEMA docaut; 

ALTER DATABASE docaut_db SET search_path TO docaut;

CREATE ROLE frodo WITH NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS LOGIN ENCRYPTED PASSWORD 'passw0rd';

GRANT CONNECT ON DATABASE docaut_db TO frodo;

GRANT USAGE ON SCHEMA docaut TO frodo;

ALTER DEFAULT PRIVILEGES IN SCHEMA docaut GRANT SELECT,INSERT,UPDATE,DELETE ON tables TO frodo;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE "user" (
   user_id UUID NOT NULL,
   user_email TEXT NOT NULL,
   user_password TEXT NOT NULL,
   user_name TEXT NOT NULL,
   user_surname TEXT NOT NULL,
   CONSTRAINT user_pkey PRIMARY KEY(user_id),
   CONSTRAINT email_unique UNIQUE (user_email)
);

CREATE UNIQUE INDEX user_email_unique 
  ON "user" USING btree (user_email);

CREATE INDEX user_user_email_idx
  ON "user" USING btree (user_email);



