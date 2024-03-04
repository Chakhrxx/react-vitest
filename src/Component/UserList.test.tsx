import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import UserList from "./UserList";

// Mock axios

vi.mock("axios");

describe("UserList component", () => {
  const mockUsers = [
    {
      name: "Becky Bernier",
      email: "Rylee.Stanton19@hotmail.com",
      phoneNumber: "501-830-2032",
      id: "1",
    },
    {
      name: "Woodrow Herzog",
      email: "Jerod.Quigley@gmail.com",
      phoneNumber: "773-510-5968",
      id: "2",
    },
    {
      name: "Celia Gislason",
      email: "Myrtice.Wilkinson@gmail.com",
      phoneNumber: "205-685-3449",
      id: "3",
    },
    {
      name: "Guadalupe Fritsch",
      email: "Reece_Runolfsdottir@gmail.com",
      phoneNumber: "391-894-4285",
      id: "4",
    },
  ];

  it("renders the table successfully when API call succeeds", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockUsers,
    });
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText("Becky Bernier")).toBeInTheDocument();
      expect(
        screen.getByText("Rylee.Stanton19@hotmail.com")
      ).toBeInTheDocument();
    });
  });

  it("filters users based on search input", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockUsers,
    });
    render(<UserList />);

    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText("Search by name or email"), {
        target: { value: "Becky" },
      });
      expect(screen.getByText("Becky Bernier")).toBeInTheDocument();
      expect(screen.queryByText("Woodrow Herzog")).not.toBeInTheDocument();
    });
  });

  it("handles API failure without problems and still renders", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error("API call failed")
    );
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<UserList />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching users:",
        expect.any(Error)
      );
      expect(
        screen.getByPlaceholderText("Search by name or email")
      ).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
