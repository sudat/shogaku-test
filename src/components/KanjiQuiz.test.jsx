import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import KanjiQuiz from "./KanjiQuiz.jsx";

afterEach(() => {
  cleanup();
});

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

  it("学年とモードを選ぶとクイズ画面へ進む", () => {
    render(<KanjiQuiz />);

    fireEvent.click(screen.getByRole("button", { name: "3年生" }));
    fireEvent.click(screen.getByRole("button", { name: /読み（よみ）/ }));

    expect(screen.getByText(/小学３年生・1 \/ 10 もん/)).toBeInTheDocument();
    expect(screen.getByText(/この漢字の/)).toBeInTheDocument();
  });
});
