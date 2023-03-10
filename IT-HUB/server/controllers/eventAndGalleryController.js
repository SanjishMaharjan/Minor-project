const Event = require("../models/eventModel");
const Gallery = require("../models/galleryModel");
const asyncHandler = require("express-async-handler");

//*                                  image of Event
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getAllImages = asyncHandler(async (req, res) => {
  const albums = await Gallery.find();
  res.status(200).json(albums);
});

//* get image of particular event
//////////////////////////////////////////////////
const getImages = asyncHandler(async (req, res) => {
  const { albumId } = req.params;
  const album = await Gallery.findById(albumId);
  if (!album) {
    res.status(404);
    throw new Error(`no album with id: ${albumId}`);
  }
  res.status(200).json(album);
});

//* get all events
////////////////////////////////////////////////
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
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
  getAllImages,
  getImages,
  getAllEvents,
  getEvent,
};
