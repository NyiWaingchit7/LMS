"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRemove = exports.fileDelete = exports.fileUpload = void 0;
const storage_1 = require("firebase/storage");
const firebaseConfig_1 = require("./firebaseConfig");
const uuid_1 = require("uuid");
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const imgRef = (0, storage_1.ref)(firebaseConfig_1.storage, `image/${files[0].originalname + "" + (0, uuid_1.v4)()}`);
        const imagMetaData = {
            contentType: files[0].mimetype,
        };
        const imgSnapShop = yield (0, storage_1.uploadBytesResumable)(imgRef, files[0].buffer, imagMetaData);
        const imgUrl = yield (0, storage_1.getDownloadURL)(imgSnapShop.ref);
        return res.status(200).json({ imgUrl });
    }
    catch (error) {
        return res.status(500).json({ message: "error" });
    }
});
exports.fileUpload = fileUpload;
const fileDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image } = req.body;
    try {
        if (!image)
            return res.status(400).json({ message: "The image is required." });
        const imgRef = (0, storage_1.ref)(firebaseConfig_1.storage, image);
        yield (0, storage_1.deleteObject)(imgRef);
        return res
            .status(200)
            .json({ message: "The image is deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.fileDelete = fileDelete;
const fileRemove = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const imagRef = (0, storage_1.ref)(firebaseConfig_1.storage, image);
    yield (0, storage_1.deleteObject)(imagRef);
});
exports.fileRemove = fileRemove;
