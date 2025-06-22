const photo = require("../models/photos");

exports.uploadPhotos = async (req, res) => {
  try {
    const files = req.files;
    const userId = req.user.id;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "no photos Uploaded" });
    }
    const uploadedPhotos = await Promise.all(
      files.map((file) =>
        photo.create({
          filename: file.filename,
          filepath: `/uploads/${file.filename}`,
          user: userId,
        })
      )
    );
    res.status(201).json({ message: "photos uploaded", data: uploadedPhotos });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await photo.find({ user: req.user.id });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: "fetch failed", error: err.message });
  }
};
