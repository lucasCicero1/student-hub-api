import cors from "cors";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["*"],
  optionsSuccessStatus: 200,
};

export default cors(corsOptions);
