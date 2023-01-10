import { Calc } from "../models/calc.model.js";

export const getAllCalcParameters = async (req, res) => {
  try {
    const allParameters = await Calc.find();
    if (!allParameters) throw Error("data not found");
    res.send(allParameters);
  } catch (e) {
    res.send(e.message);
  }
};
export const getWindowParams = async (req, res) => {
  const id = req.params.id;
  try {
    const windowParams = await Calc.findById({ _id: id });
    if (!windowParams) throw Error("product not found");
    res.send(windowParams);
  } catch (e) {
    res.send(e.message);
  }
};
export const createWindowParams = async (req, res) => {
  try {
    const windowParams = await Calc.create(req.body);
    if (!windowParams) throw Error("bad data was inserted!");
    res.send(windowParams);
  } catch (e) {
    res.send(e.message);
  }
};
export const deleteWindowParams = async (req, res) => {
  try {
    const windowParams = await Calc.findByIdAndDelete({ _id: req.body._id });
    if (!windowParams) throw Error("bad data was inserted!");
    res.send(windowParams);
  } catch (e) {
    res.send(e.message);
  }
};
export const updateWindowParams = async (req, res) => {
  try {
    const newWindowParams = await Calc.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: req.body }
    );
    if (!newWindowParams) throw Error("bad data was inserted!");
    res.send(newWindowParams);
  } catch (e) {
    res.send(e.message);
  }
};
