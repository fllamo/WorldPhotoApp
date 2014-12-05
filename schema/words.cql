CREATE KEYSPACE words WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 2 };

CREATE TABLE words.User (
  firstName VARCHAR,
  lastName VARCHAR,
  email VARCHAR PRIMARY KEY
);

CREATE TABLE words.Submission (
  id VARCHAR PRIMARY KEY,
  wordOfTheDayId VARCHAR,
  userEmail VARCHAR,
  timestamp TIMESTAMP,
  votesFor INT,
  linkToImage VARCHAR
);

CREATE TABLE words.WordOfTheDay (
  id VARCHAR PRIMARY KEY,
  dateStarted TIMESTAMP,
  word VARCHAR
);

CREATE USER altadmin WITH PASSWORD 'inn0W33k' SUPERUSER;
ALTER USER cassandra WITH PASSWORD 'supercalifragilisticexpialidcious-too';
CREATE USER wordsapp WITH PASSWORD 'inn0W33k' NOSUPERUSER;

CREATE INDEX submission_word_idx ON submission(wordOfTheDayId);
CREATE INDEX submission_email_idx ON submission(userEmail);

