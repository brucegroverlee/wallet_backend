import { addRangeQuery } from "./addRangeQuery";

describe("addRangeQuery test suit", () => {
  const query = {
    userId: "ab7c2f60-00e7-11eb-a989-d373f77e6eb8",
  };

  test("It should add the time range.", async (done) => {
    const result = addRangeQuery(query, "createdAt", "2020-01-30", "2020-02-30");
    expect(typeof result).toEqual("object");
    expect(result.userId).toEqual("ab7c2f60-00e7-11eb-a989-d373f77e6eb8");
    expect(typeof result.createdAt).toEqual("object");
    done();
  });

  test("It shouldn't add the time range. The range variables aren't defined.", async (done) => {
    const result = addRangeQuery(query, "createdAt", undefined, undefined);
    expect(typeof result).toEqual("object");
    expect(result.userId).toEqual("ab7c2f60-00e7-11eb-a989-d373f77e6eb8");
    expect(Object.keys(result).length).toEqual(1);
    expect(result.createdAt).toEqual(undefined);
    done();
  });
});