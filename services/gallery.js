const Gallery = require("../models/gallery");
module.exports = class GalleryService {
  async uploadPhoto(url) {
    const imageUrl = { image_url: url };
    return await Gallery.query().insertGraph(imageUrl);
  }

  async findAll(photos) {
    try {
      const galleryData = await Gallery.query(photos);
      return galleryData;
    } catch (err) {
      return err;
    }
  }
};
