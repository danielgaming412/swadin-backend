const request = require("supertest");

it("should return a successful response when given a valid phone number", async () => {
    const phoneNumber = "+1234567890";
  
    await request(strapi.server.httpServer)
      .post("/api/sms-code")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ phoneNumber })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body).toBeDefined();
        expect(data.body.status).toBe("success");
        expect(data.body.message).toBe("SMS code sent successfully");
      })
      .catch((error) => {
        console.log("Error:", error);
        throw error;
      });
  });
  