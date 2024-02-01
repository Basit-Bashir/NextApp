import mongoose, { Connection } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    Connection.on("connected", () => {
      console.log("DB connection successfull");
    });
    connection.on("error", (err) => {
      console.log(
        "DB Connection error. Please check MongoDB is running?" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
