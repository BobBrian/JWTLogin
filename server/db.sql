//New Table

CREATE Table usersjwt(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255)NOT NULL
);

refrence to the original code

id = user_id
name = user_name
email = user_email
password = user_password

create extension if not exists "uuid-ossp";

INSERT INTO usersjwt(name, email, password) VALUES ('max', 'max123@gmail.com','max123');

select * from usersjwt ;

DELETE from usersjwt where name = 'maxie' ;

