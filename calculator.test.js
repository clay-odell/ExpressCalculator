const request = require('supertest');
const app = require('./calculator');

describe("Test the mean path", () => {
    test("GET method provides the correct response", async() => {
        const response = await request(app).get("/mean?nums=1,2,3,4");

        expect(response.statusCode).toBe(200);
        expect(response.body.mean).toBe(2.5);
    });
});

describe("Test the mean path's error handling", () => {
    test("It should return 400 for invalid numbers", async () => {
        const response = await request(app).get("/mean?nums=1,2,foo");

        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('foo is not a number');
    });
});

describe("Test the median path", () => {
    test("The GET method provides the correct response", async () => {
        const response = await request(app).get("/median?nums=1,2,3,4,5");

        expect(response.statusCode).toBe(200);
        expect(response.body.median).toBe(3);
    });
});

describe("Test the median path's error handing", () => {
    test("If there is no input for nums, it will return 400 for no nums", async () => {
        const response = await request(app).get("/median?nums=")
        
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Numerical input is required')
    });

    test("If input is NaN, it will respond 400", async () => {
        const response = await request(app).get("/median?nums=foo,3,4,5");

        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('foo is not a number')
    })
})

describe("Test mode path", () => {
    test("The GET method provides the correct response", async () => {
        const response = await request(app).get("/mode?nums=1,2,3,3");

        expect(response.statusCode).toBe(200);
        expect(response.body.mode).toEqual([3]);
    });
});
