const mongoose = require("mongoose");

const connectionDatabase = () => {
  //   const mongoDbUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  const mongoDbUrl = process.env.URL;
  console.log(`Connecting to ${mongoDbUrl}`);

  mongoose.Promise = global.Promise;

  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log(`Could not connect to the database. Exiting now...\n${err}`);
      process.exit();
    });
};

export default connectionDatabase;
