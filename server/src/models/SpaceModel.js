import { Schema, model } from "mongoose";

import modelOptions from "./model.options";

const spaceSchema = new Schema(
  {
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
    type: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
  },
  modelOptions,
);

const SpaceModel = model("Space", spaceSchema);

export default SpaceModel;
