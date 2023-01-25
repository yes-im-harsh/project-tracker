const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
require("dotenv").config();
const port = process.env.PORT || 5000;

//Connect To Database
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server is running on ${port}`));
