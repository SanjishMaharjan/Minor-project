const Event = require("../models/eventModel");
const asyncHandler = require("express-async-handler");

//* get all events
////////////////////////////////////////////////
const getAllEvents = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const upCommingEvents = await Event.find({ endDate: { $gt: currentDate } });
  const expiredEvents = await Event.find({ endDate: { $lt: currentDate } });
  res.status(200).json({ upCommingEvents, expiredEvents });
});

//* get a specific events
////////////////////////////////////////////////
const getEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error(`no event with id:${eventId}`);
  }
  res.status(200).json(event);
});

//*export modules
///////////////////////////////////////////////
module.exports = {
  getAllEvents,
  getEvent,
};
