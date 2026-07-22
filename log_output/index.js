import crypto from "crypto";

const UUID = crypto.randomUUID();
const TIMEOUT = 5000;

const logOutput = () => {
  const timestamp = new Date().toISOString();

  console.log(`${timestamp}: ${UUID}`);

  setTimeout(() => {
    logOutput();
  }, TIMEOUT);
};

logOutput();
