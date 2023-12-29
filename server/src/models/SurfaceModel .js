import { Schema, model } from "mongoose";

import modelOptions from "./model.options";

const surfaceSchema = new Schema(
  {
    space: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Space",
    },
    format: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  modelOptions,
);

const SurfaceModel = model("Surface", surfaceSchema);

export default SurfaceModel;
