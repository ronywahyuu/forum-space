import { MemoryRouter } from "react-router-dom";
import Leaderboard from "../Leaderboard";
import { renderWithProviders } from "@/utils/test-utils";
import { screen, waitFor } from "@testing-library/dom";

describe('Leaderboard Component', () => {
  it('should render skeleton loader if data is in fetching state', async () => {
    // arrange
    renderWithProviders(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>
    )

    // act
    const skeletonLoader = screen.getByLabelText("skeleton")
    // assert
    expect(skeletonLoader).toBeInTheDocument()
  })
  it('should render the leaderboard correctly if data is fetched', async () => {
    // arrange
 
    const data = [
      {
        user: {
          id: "1",
          name: "Test User",
          email: "test@gmail.com",
        },
        score: 100
      },
      {
        user: {
          id: "2",
          name: "Test User 2",
          email: "test2@gmail.com",
        },
        score: 200
      }
    ]

    renderWithProviders(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>
    )

    // act

    // assert
    // expect().toHaveText
  });
});