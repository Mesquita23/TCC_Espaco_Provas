CREATE TABLE "students" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "ra" int,
  "semester" int,
  "password" text NOT NULL,
  "created_at" timestamp DEFAULT 'now()',
  "id_course" int UNIQUE,
  "id_file" int UNIQUE,
  "reset_token" text,
  "reset_token_expires" text
);

CREATE TABLE "cordinators" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "created_at" timestamp DEFAULT 'now()',
  "reset_token" text,
  "reset_token_expires" text
);

CREATE TABLE "Achievements" (
  "id" SERIAL PRIMARY KEY,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "url_img" text,
  "id_file" int
);

CREATE TABLE "courses" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "id_cordinator" int UNIQUE
);

CREATE TABLE "admin" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "password" text
);

CREATE TABLE "matters" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "semester" int,
  "id_course" int
);

CREATE TABLE "tests" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "description" text,
  "datestart" timestamp,
  "dateend" timestamp,
  "typetest" int NOT NULL,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT 'now()',
  "id_course" int
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "question" text NOT NULL,
  "punctuation" int,
  "id_test" int,
  "id_matter" int,
  "id_alternativecorrect" int
);

CREATE TABLE "alternatives" (
  "id" SERIAL PRIMARY KEY,
  "alternative" text NOT NULL,
  "id_question" int
);

CREATE TABLE "users_achievements" (
  "id" SERIAL PRIMARY KEY,
  "id_user" int,
  "id_achievements" int
);

CREATE TABLE "students_tests" (
  "id" SERIAL PRIMARY KEY,
  "id_student" int,
  "id_test" int,
  "punctuation" int,
  "created_at" timestamp
);

CREATE TABLE "answers" (
  "id" SERIAL PRIMARY KEY,
  "id_alternativechosen" int,
  "id_student_tests" int,
  "id_question" int
);


ALTER TABLE "courses" ADD FOREIGN KEY ("id_cordinator") REFERENCES "cordinators" ("id") ON DELETE CASCADE;

ALTER TABLE "students" ADD FOREIGN KEY ("id_course") REFERENCES "courses" ("id") ON DELETE CASCADE;

ALTER TABLE "matters" ADD FOREIGN KEY ("id_course") REFERENCES "courses" ("id") ON DELETE CASCADE;

ALTER TABLE "tests" ADD FOREIGN KEY ("id_course") REFERENCES "courses" ("id") ON DELETE CASCADE;

ALTER TABLE "users_achievements" ADD FOREIGN KEY ("id_user") REFERENCES "students" ("id") ON DELETE CASCADE;

ALTER TABLE "users_achievements" ADD FOREIGN KEY ("id_achievements") REFERENCES "Achievements" ("id") ON DELETE CASCADE;

ALTER TABLE "students_tests" ADD FOREIGN KEY ("id_student") REFERENCES "students" ("id") ON DELETE CASCADE;

ALTER TABLE "students_tests" ADD FOREIGN KEY ("id_test") REFERENCES "tests" ("id") ON DELETE CASCADE;

ALTER TABLE "questions" ADD FOREIGN KEY ("id_matter") REFERENCES "matters" ("id") ON DELETE CASCADE;

ALTER TABLE "questions" ADD FOREIGN KEY ("id_test") REFERENCES "tests" ("id") ON DELETE CASCADE;

ALTER TABLE "alternatives" ADD FOREIGN KEY ("id_question") REFERENCES "questions" ("id") ON DELETE CASCADE                     ;

ALTER TABLE "questions" ADD FOREIGN KEY ("id_alternativecorrect") REFERENCES "alternatives" ("id") ON DELETE CASCADE;

ALTER TABLE "answers" ADD FOREIGN KEY ("id_student_tests") REFERENCES "students_tests" ("id") ON DELETE CASCADE;

ALTER TABLE "answers" ADD FOREIGN KEY ("id_question") REFERENCES "questions" ("id") ON DELETE CASCADE;

ALTER TABLE "answers" ADD FOREIGN KEY ("id_alternativechosen") REFERENCES "alternatives" ("id") ON DELETE CASCADE;

-- config to session connect pg simple table

CREATE TABLE "session"(
  "sid" VARCHAR NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) not NULL
)
with (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid")

-- token password recovery students
ALTER TABLE "students" ADD COLUMN reset_token text;
ALTER TABLE "students" ADD COLUMN reset_token_expires text;


-- token password recovery cordinators
ALTER TABLE "cordinators" ADD COLUMN reset_token text;
ALTER TABLE "cordinators" ADD COLUMN reset_token_expires text;