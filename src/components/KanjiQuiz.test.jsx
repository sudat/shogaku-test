import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import KanjiQuiz from "./KanjiQuiz.jsx";

describe("KanjiQuiz", () => {
  it("タイトルを2行で表示し、名前を色分けする", () => {
    render(<KanjiQuiz />);

    expect(
      screen.getByText((_, element) => element?.textContent === "あかりととしはるの"),
    ).toBeInTheDocument();
    expect(screen.getByText("かんじテスト")).toBeInTheDocument();
    expect(screen.getByText("あかり")).toHaveClass("kq-name-akari");
    expect(screen.getByText("としはる")).toHaveClass("kq-name-toshiharu");
  });
});
