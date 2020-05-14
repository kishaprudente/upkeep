const axios = require("axios");

describe("Transaction API Routes", () => {
	describe("GET /api/transactions", () => {
		it("should return a status code of 200", async () => {
			const { status } = await axios.get("/api/transactions");
			expect(status).toBe(200);
		});
		it("should have content type json", async () => {
			const expectedContentType = "application/json";
			const { headers } = await axios.get("/api/transactions");

			const hasJSON =
				JSON.stringify(headers).indexOf(expectedContentType) !== -1;

			expect(hasJSON).toBe(true);
		});
		it("should return an array", async () => {
			const { data } = await axios.get("/api/transactions");
			const isArray = Array.isArray(data);
			expect(isArray).toBeTruthy();
			expect(data).toBeTruthy();
		});
		it("should return an array of objects if it's not empty", async () => {
			const { data } = await axios.get("/api/transactions");
			const isObject = typeof data[0] === "object";

			if (data.length > 0) {
				expect(isObject).toBe(true);
			} else {
				expect(isObject).toBe(false);
			}
		});
		it("should have the correct properties purpose and amount with existing values", async () => {
			const { data } = await axios.get("/api/transactions");
			const isObject = typeof data[0] === "object";

			if (data.length > 0) {
				const [transaction] = data;
				const { purpose, amount } = transaction;
				expect(purpose).toBeTruthy();
				expect(amount).toBeTruthy();
			} else {
				expect(isObject).toBe(false);
			}
		});
	});
	// /api/transactions/:id
	// get, post, delete, update request
});
