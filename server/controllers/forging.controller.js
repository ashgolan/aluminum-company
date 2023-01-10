import { Forging } from "../models/forging.model.js";

export const getAllForgingBids = async (req, res) => {
  try {
    const forgingBids = await Forging.find();
    if (!forgingBids) throw Error("forgingBids not found");
    res.send(forgingBids);
  } catch (e) {
    res.send(e.message);
  }
};
export const getForgingBid = async (req, res) => {
  const id = req.params.id;
  try {
    const forgingBid = await Forging.findById({ _id: id });
    if (!forgingBid) throw Error("forgingBid not found");
    res.send(forgingBid);
  } catch (e) {
    res.send(e.message);
  }
};
export const createForgingBid = async (req, res) => {
  try {
    const forgingBid = await Forging.create(req.body);
    if (!forgingBid) throw Error("bad data was inserted!");
    res.send(forgingBid);
  } catch (e) {
    res.send(e.message);
  }
};
export const deleteForgingBid = async (req, res) => {
  try {
    const forgingBid = await Forging.findByIdAndDelete({ _id: req.body._id });
    if (!forgingBid) throw Error("bad data was inserted!");
    res.send(forgingBid);
  } catch (e) {
    res.send(e.message);
  }
};
export const updateForgingBid = async (req, res) => {
  try {
    const newForgingBid = await Forging.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: req.body }
    );
    if (!newForgingBid) throw Error("bad data was inserted!");
    res.send(newForgingBid);
  } catch (e) {
    res.send(e.message);
  }
};
