import { Bid } from "../models/bid.model.js";

export const getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find();
    if (!bids) throw Error("bids not found");
    res.send(bids);
  } catch (e) {
    res.send(e.message);
  }
};
export const getBid = async (req, res) => {
  const id = req.params.id;
  try {
    const bid = await Bid.findById({ _id: id });
    if (!bid) throw Error("bid not found");
    res.send(bid);
  } catch (e) {
    res.send(e.message);
  }
};
export const createBid = async (req, res) => {
  try {
    const bid = await Bid.create(req.body);
    if (!bid) throw Error("bad data was inserted!");
    res.send(bid);
  } catch (e) {
    res.send(e.message);
  }
};
export const deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete({ _id: req.body._id });
    if (!bid) throw Error("bad data was inserted!");
    res.send(bid);
  } catch (e) {
    res.send(e.message);
  }
};
export const updateBid = async (req, res) => {
  try {
    const newBid = await Bid.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: req.body }
    );
    if (!newBid) throw Error("bad data was inserted!");
    res.send(newBid);
  } catch (e) {
    res.send(e.message);
  }
};
