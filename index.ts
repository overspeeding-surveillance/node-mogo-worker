import amqp from "amqplib/callback_api";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const FIFTH_PYTHON_QUEUE = "FIFTH_PYTHON_QUEUE";

const addNumber = async (number: string) => {
  await prisma.detection.create({
    data: {
      number,
    },
  });
};

amqp.connect("amqp://localhost", function (error0: any, connection: any) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1: any, channel: any) {
    console.log("Connection Successful!");
    console.log("[x] Waiting ...");
    if (error1) {
      throw error1;
    }
    var queue = FIFTH_PYTHON_QUEUE;
    channel.assertQueue(queue, {
      durable: false,
    });
    channel.consume(
      queue,
      function (msg: any) {
        console.log(msg);
        addNumber(msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
