import { Schema, model } from "mongoose";
import modelOptions from "./model.options";

const reportSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: {
      type: String,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  modelOptions,
);

const ReportModel = model("Report", reportSchema);

export default ReportModel;
