import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const corsOption = {
  origin: "https://leafmate.netlify.app",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

export const app = express();
app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/getData/:pageNo", async (req, res, next) => {
  const { arr } = req.body;
  const { pageNo } = req.params;

  const pageSize = Math.ceil((arr.length - 1) / 3);
  const startIndex = (pageNo - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, arr.length-1);

  let res_arr = arr.slice(startIndex, endIndex);

  res.status(201).json({
    success: true,
    res_arr: res_arr,
  });
});
