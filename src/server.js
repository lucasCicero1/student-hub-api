import app from "./app";

const serverPort = process.env.PORT || 3000;

app.listen(serverPort, () => {
  console.log(`Server running on port: ${serverPort}`);
});

// import connectionDb from "./database";

// const serverPort = process.env.PORT || 3000;

// function execute() {
//   connectionDb
//     .authenticate()
//     .then(() => {
//       app.listen(serverPort, () => {
//         console.log(`Server running on port: ${serverPort}`);
//       });
//     })
//     .catch((err) => {
//       console.info(err);
//     });
// }

// process.on("uncaughtException", async (error) => console.error(error));
// process.on("unhandledRejection", async (error) => console.error(error));

// function disconnect(code) {
//   return async (event) => {
//     const time = new Date().toISOString();
//     console.info(`${code}: Closing app ${process.pid} - ${event}`);
//     await connectionDb.close();
//     console.info(`DB disconnected: ${time}, ${process.pid}`);
//     process.exit(0);
//   };
// }

// process.on("SIGINT", disconnect("SIGINT"));
// process.on("SIGTERM", disconnect("SIGTERM"));

// execute();
