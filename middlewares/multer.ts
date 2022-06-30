import multer from "multer";
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Crypto from "crypto";
const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: async (req: any, file: any) => {
    return {
      folder: "id_proofs",
      public_id: Crypto.randomBytes(13).toString("base64").slice(0, 13),
    };
  },
});
const file = multer({ storage });
export default file;
