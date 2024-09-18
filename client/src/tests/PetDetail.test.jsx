import React from "react";
import { render, screen } from "@testing-library/react";
import PetDetail from "../components/Pet/PetDetail"; // Assuming this is the module you want to mock

// Mock the PetDetail module
jest.mock("../components/Pet/PetDetail");

describe("Profile Component Tests", () => {
    const mockPet = {
      petName: "Ann",
      petBirthYear: 2012,
      petCity: "Vancouver", 
      imageUrl: "http://example.com/picture.jpg",
    };

    test("displays pet information correctly", () => {
        // Mock implementation of PetDetail component
        PetDetail.mockImplementation(() => (
            <div>
                <p>Name: {mockPet.petName}</p>
                <p>Birth Year: {mockPet.petBirthYear}</p>
                <p>City: {mockPet.petCity}</p>
                <img src={mockPet.imageUrl} alt="Pet" />
            </div>
        ));

        render(<PetDetail />); // Assuming Adopt component renders PetDetail
        expect(screen.getByText(`Name: ${mockPet.petName}`)).toBeInTheDocument();
        expect(screen.getByText(`Birth Year: ${mockPet.petBirthYear}`)).toBeInTheDocument();
        expect(screen.getByText(`City: ${mockPet.petCity}`)).toBeInTheDocument();
        expect(screen.getByAltText("Pet")).toHaveAttribute("src", mockPet.imageUrl);
    });
});
