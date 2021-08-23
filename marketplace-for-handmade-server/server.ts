const mongoose = require("mongoose");
const app = require('./routers/routers');

const {
  MONGO_INITDB_ROOT_USERNAME: username,
  MONGO_INITDB_ROOT_PASSWORD: password,
  MONGO_HOST: host
} = process.env;
const uri = `mongodb://${username}:${password}@${host}/marketplace?authSource=admin`;

mongoose.connect(uri, { useNewUrlParser: true }, function(err) {
    if (err) {
        return console.log(err);
    }
    app.listen(5000, function () {
      console.log("Connected to db!");
      console.log("Server is listening on port 5000.")
    });
});
