CREATE TABLE user_account (
	id uuid not null primary key,
	password varchar(72) not null,
	email varchar(255) unique not null,
	username varchar(40) not null
);