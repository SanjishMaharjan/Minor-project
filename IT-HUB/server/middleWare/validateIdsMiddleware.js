const mongoose = require("mongoose");

function validateIds(...paramNames) {
  return (req, res, next) => {
    if (Object.keys(req.params).length !== 0) {
      const invalidIds = [];
      for (const paramName of paramNames) {
        const id = req.params[paramName];
        if (!mongoose.Types.ObjectId.isValid(id)) {
          invalidIds.push(paramName);
        }
      }
      if (invalidIds.length > 0) {
        const message = `Invalid ${invalidIds.join(", ")} ObjectId(s)`;
        return res.status(400).json({ message });
      }
    }
    return next();
  };
}

module.exports = validateIds;
