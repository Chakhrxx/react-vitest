import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "./registerForm";
import axios from "axios";

// Mock axios to avoid real API calls
vi.mock("axios");

describe("App component", () => {
  beforeAll(() => {
    // Mock window.alert
    window.alert = vi.fn();
  });
  it("renders the form", () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);
    expect(getByLabelText(/name/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(getByText(/submit/i)).toBeInTheDocument();
  });

  it("shows validation errors", () => {
    const { getByText } = render(<RegisterForm />);

    fireEvent.click(getByText(/submit/i));

    expect(getByText(/name is required/i)).toBeInTheDocument();
    expect(getByText(/email is required/i)).toBeInTheDocument();
    expect(getByText(/phone number is required/i)).toBeInTheDocument();
  });

  it("shows validation email format errors", () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);

    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "johndoe@example" },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(getByText(/submit/i));

    expect(getByText(/email is invalid/i)).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);
    const mockResponse = {
      data: {
        id: 1,
        name: "Becky Bernier",
        email: "Rylee.Stanton19@hotmail.com",
        phoneNumber: "5018302032",
      },
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      mockResponse
    );
    fireEvent.change(getByLabelText(/name/i), {
      target: { value: "Becky Bernier" },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: "Rylee.Stanton19@hotmail.com" },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: "5018302032" },
    });

    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(
        axios.post as jest.MockedFunction<typeof axios.post>
      ).toHaveBeenCalledWith(
        "https://65e5cddcd7f0758a76e77232.mockapi.io/user",
        {
          name: "Becky Bernier",
          email: "Rylee.Stanton19@hotmail.com",
          phoneNumber: "5018302032",
        }
      );
    });
  });
});
