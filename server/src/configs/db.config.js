import mongoose from "mongoose";

const dbConfig = {
  connect: async (url, server, port) => {
    try {
      await mongoose.connect(url);
      console.log("Connect successfully");
      server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    } catch (error) {
      console.log("Connect failure");
      process.exit(1);
    }
  },
};

export default dbConfig;
