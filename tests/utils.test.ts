import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and removes duplicates", () => {
    expect(cn("text-sm", false && "hidden", "text-sm", "font-bold")).toBe("text-sm font-bold");
  });
});
