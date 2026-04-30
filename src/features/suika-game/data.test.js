import { describe, expect, it } from "vitest";
import { FRUITS, getMergedLevel } from "./data.js";

describe("suika merge levels", () => {
  it("進化順の先頭にいちじくが入る", () => {
    expect(FRUITS[0].label).toBe("いちじく");
    expect(FRUITS.slice(0, 3).map((fruit) => fruit.label)).toEqual(["いちじく", "いちご", "ぶどう"]);
  });

  it("1つ下の段は次の果物に進化する", () => {
    expect(getMergedLevel(0)).toBe(1);
    expect(getMergedLevel(4)).toBe(5);
  });

  it("最後のスイカ同士は消滅扱いになる", () => {
    expect(getMergedLevel(FRUITS.length - 1)).toBeNull();
  });
});
