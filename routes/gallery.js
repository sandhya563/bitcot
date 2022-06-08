const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const GalleryService = require("../services/gallery");
const Services = new GalleryService();

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// image upload API
router.post("/uploadImage", (req, res) => {
  //   const userId = req.decode.id;
  console.log(req.files, "hello image");
  if (!req.files) {
    return res
      .status(400)
      .send({ status: "error", message: "No files were uploaded." });
  }
  // collected image from a user
  const data = req.files.myimage.tempFilePath;
  console.log(data, "data1111");
  // console.log(req.files.myimage.tempFilePath);
  // upload image here
  cloudinary.uploader
    .upload(data)
    .then(async (result) => {
      const url = result.url;
      await Services.uploadPhoto(url);
      console.log(url, " route url");
      res.status(200).send({
        status: "success",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        status: "failure",
        error,
      });
    });
});

// get all photos
router.get("/images", async (req, res) => {
  await Services.findAll()
    .then((data) => {
      res.send({ status: "success", data: data });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
