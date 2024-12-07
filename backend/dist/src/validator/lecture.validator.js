"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.lectureValidation = exports.schema = void 0;
const yup = __importStar(require("yup"));
exports.schema = yup.object().shape({
    title: yup.string().required("The title field is required."),
    categories: yup.array().min(1, "The category field is required."),
    description: yup.string().required("The description field is required."),
    discount_price: yup
        .number()
        .min(0, "The discount price must be a positive number."),
    price: yup.number().when("$isPremium", {
        is: true,
        then: (yup) => yup
            .required("The price field is required for premium lectures.")
            .min(0, "The price must be a positive number.")
            .test("is-greater-than-discount", "The price must be greater than the discount price.", function (value) {
            return value > this.parent.discount_price;
        }),
        otherwise: (yup) => yup.nullable().notRequired(),
    }),
});
const lectureValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isPremium = req.body.isPremium;
        yield exports.schema.validate(req.body, {
            abortEarly: false,
            context: { isPremium },
        });
        next();
    }
    catch (err) {
        const errors = {};
        if (err.inner) {
            err.inner.forEach((error) => {
                if (error.path) {
                    errors[error.path] = error.message;
                }
            });
        }
        return res.status(400).json({ errors });
    }
});
exports.lectureValidation = lectureValidation;
