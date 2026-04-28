import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App.jsx";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("教科選択から漢字テストへ進める", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /かんじ/ }));

    expect(screen.getByText("かんじテスト")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /教科をえらぶ/ })).toBeInTheDocument();
  });

  it("教科選択から算数テストへ進み、数字で回答できる", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /さんすう/ }));
    fireEvent.click(screen.getByRole("button", { name: "1年生" }));
    fireEvent.click(screen.getByRole("button", { name: /スタート/ }));
    fireEvent.change(screen.getByLabelText("こたえ"), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "こたえる" }));

    expect(screen.getByText(/せいかい！|こたえは/)).toBeInTheDocument();
  });
});
