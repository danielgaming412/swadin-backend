// ./tests/app.test.js
const fs = require('fs');
const { setupStrapi, cleanupStrapi , grantPrivilege} = require("./helpers/strapi");
//require('./smsCode');
const request = require("supertest");
beforeAll(async () => {
  await setupStrapi();
  // Grant the required permissions for the test
  await grantPrivilege(2, {
    "sms-code": ["create"],
    // Add any other required permissions
  });
});

afterAll(async () => {
  await cleanupStrapi();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});

// Add a delay before running the problematic test
const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

describe("SMS code tests with delay", () => {

  it("should return a successful response when given a valid phone number", async () => {
    const phoneNumber = "+1234567890";

    await request(strapi.server.httpServer)
      .post("/api/sms-code")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ phone: phoneNumber })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        console.log(data.body);
        expect(data.body).toBeDefined();
        expect(data.body.message).toBe("Verification code sent successfully");      
      })
      .catch((error) => {
        console.log("Error:", error);
        throw error;
      });
  });
});