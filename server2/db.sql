--codes--
npm init -y
npm install express
npm install nodemon
npm install pg
npm install cors
npm i dotenv
npm i jsonwebtoken
npm i bcrypt
npx create-react-app client
npx create-react-app myapp
 "start": "nodemon server.js"
npm install express-validator


CREATE Table datajwt(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255)NOT NULL
);


CREATE Table publicpost(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL
);

CREATE Table privatepost(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL
);

CREATE Table tableA(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL
);

INSERT INTO privatepost( title, content) VALUES ('Blake', 'Blake Was Here');
INSERT INTO privatepost( title, content) VALUES ('Adam', 'Adam Was Here');
INSERT INTO privatepost( title, content) VALUES ('Rob', 'Rob Was Here');
INSERT INTO tableA( name, location) VALUES ('Rob', 'New York');
INSERT INTO tableA( name, location) VALUES ('Adam', 'Oregon');
INSERT INTO tableA( name, location) VALUES ('Blake', 'Colorado');

//Routing Template
app.post("", async (req,res)=>{
    
})