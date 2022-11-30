import mongoose from "mongoose";

async function connect() {
  try {
    //Pegando o caminho da conexão dentro do arquivo .env
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Connected to database ${dbConnection.connection.name}`);
  } catch (error) {
    console.log(error);
  }
}

export default connect;
