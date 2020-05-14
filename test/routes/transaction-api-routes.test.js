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
	describe("POST /api/transactions", () => {
		it("should return a status code of 200", async () => {
			const { status } = await axios.post("/api/transactions", {
				id: 10000,
				purpose: "Utilities",
				amount: "500.00",
				note: "Water & Electric & Gas",
				UserId: 1,
			});
			expect(status).toBe(200);
		});
	});
	describe("GET /api/transactions/:id where id = 10000 assuming test user 1 is logged in", () => {
		it("should return a status code of 200", async () => {
			const { status } = await axios.get("/api/transactions/10000");
			expect(status).toBe(200);
		});
		it("should have content type json", async () => {
			const expectedContentType = "application/json";
			const { headers } = await axios.get("/api/transactions/10000");

			const hasJSON =
				JSON.stringify(headers).indexOf(expectedContentType) !== -1;

			expect(hasJSON).toBe(true);
		});
		it("should return an array of one object if it's not empty", async () => {
			const { data } = await axios.get("/api/transactions/10000");
			const isObject = typeof data[0] === "object";

			if (data.length > 0) {
				expect(isObject).toBe(true);
			} else {
				expect(isObject).toBe(false);
			}
		});
		it("should have the correct properties purpose and amount with existing values", async () => {
			const { data } = await axios.get("/api/transactions/10000");
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
	describe("PUT /api/transactions/10000", () => {
		beforeEach(async () => {
			jest.setTimeout(10000);
		});
		it("should return a status code of 200", async () => {
			try {
				const { status } = await axios.put("/api/transactions/3", {
					purpose: "Utilities",
					amount: "401.00",
					note: "Water & Electric",
				});
				console.log(status);
				expect(status).toBe(200);
			} catch (err) {
				throw err;
			}
		});
	});
	describe("DELETE /api/transactions/10000", () => {
		it("should return a status code of 200", async () => {
			const { status } = await axios.delete("/api/transactions/10000");
			expect(status).toBe(200);
		});
	});
});
