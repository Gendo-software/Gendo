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
 
CREATE TABLE template (
	id UUID NOT NULL,
	current_version UUID NOT NULL,
	user_id UUID NOT NULL,
	deleted BOOLEAN NOT NULL DEFAULT FALSE,
	during_editing BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ,
	CONSTRAINT template_pkey PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES "user" (user_id)
);

CREATE INDEX template_user_id_idx 
  ON template USING btree (user_id);

CREATE INDEX template_current_version_idx 
  ON template USING btree (current_version);
  
CREATE TABLE template_version (
  id UUID NOT NULL,
  template_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  content JSON NOT NULL,
  CONSTRAINT template_version_pkey PRIMARY KEY (id),
  FOREIGN KEY (template_id) REFERENCES template (id)
);

CREATE INDEX template_version_template_id_idx 
  ON template_version USING btree (template_id);