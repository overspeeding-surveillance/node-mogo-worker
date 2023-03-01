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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const FIFTH_PYTHON_QUEUE = "FIFTH_PYTHON_QUEUE";
const addNumber = (number) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.detection.create({
        data: {
            number,
        },
    });
});
callback_api_1.default.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        console.log("Connection Successful!");
        console.log("[x] Waiting ...");
        if (error1) {
            throw error1;
        }
        var queue = FIFTH_PYTHON_QUEUE;
        channel.assertQueue(queue, {
            durable: false,
        });
        channel.consume(queue, function (msg) {
            console.log(msg);
            addNumber(msg.content.toString());
        }, {
            noAck: true,
        });
    });
});
console.log("fuck this shit");
