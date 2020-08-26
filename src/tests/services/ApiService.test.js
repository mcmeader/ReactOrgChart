import {doDelete, doGet, doPost, doPut} from "../../app/services/ApiService";

describe("Api Service", () => {

    beforeEach(() => {
        fetch.resetMocks();
    })

    describe("doGet", () => {
        it("Performs a GET Request", async () => {
            fetch.mockResponseOnce(JSON.stringify({something: "yes"}));

            const response = await doGet("/something");

            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/something');
            expect(fetch.mock.calls[0][1].method).toEqual('GET');
            expect(fetch.mock.calls[0][1].headers).toEqual({"Content-Type": "application/json"});

            expect(response.something).toEqual("yes")
        })

        it("Throws an error when API call is not a success status", async () => {
            fetch.mockResponseOnce(JSON.stringify({message: "Not Found"}), { status: 404});

            try {
                await doGet("/something");
            } catch(e) {
                expect(fetch.mock.calls.length).toEqual(1);
                expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/something');
                expect(fetch.mock.calls[0][1].method).toEqual('GET');
                expect(fetch.mock.calls[0][1].headers).toEqual({"Content-Type": "application/json"});

                expect(e.message).toEqual("Not Found")
            }

        })
    });

    describe("doPost", () => {
        it("Performs a POST Request", async () => {
            fetch.mockResponseOnce(JSON.stringify({something: "no"}));

            const response = await doPost("/something", { something: "no"});

            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/something');
            expect(fetch.mock.calls[0][1].method).toEqual('POST');
            expect(fetch.mock.calls[0][1].headers).toEqual({"Content-Type": "application/json"});
            expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({ something: "no"}));

            expect(response.something).toEqual("no")
        })
    });

    describe("doPut", () => {
        it("Performs a PUT Request", async () => {
            fetch.mockResponseOnce(JSON.stringify({something: "no"}));

            const response = await doPut("/something", { something: "no"});

            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/something');
            expect(fetch.mock.calls[0][1].method).toEqual('PUT');
            expect(fetch.mock.calls[0][1].headers).toEqual({"Content-Type": "application/json"});
            expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({ something: "no"}));

            expect(response.something).toEqual("no")
        })
    });

    describe("doDelete", () => {
        it("Performs a DELETE Request", async () => {
            fetch.mockResponseOnce(JSON.stringify({something: "yes"}));

            const response = await doDelete("/something");

            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/something');
            expect(fetch.mock.calls[0][1].method).toEqual('DELETE');
            expect(fetch.mock.calls[0][1].headers).toEqual({"Content-Type": "application/json"});

            expect(response.something).toEqual("yes")
        })
    });
})
