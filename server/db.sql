CREATE Table jwtuser(
    userid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    useremail VARCHAR(255) NOT NULL,
    userpassword VARCHAR(255)NOT NULL
);

create extension if not exists "uuid-ossp";

INSERT INTO jwtuser(username, useremail, userpassword) VALUES ('max', 'max123@gmail.com','max123');