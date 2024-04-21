import { useGetThreadsQuery } from "./threadsApiSlice"

describe('Threads API Slice', () => {
  it('should return all threads', () => {
    // Arrange
    const expectedThreads = [
      { id: 1, title: 'Thread 1' },
      { id: 2, title: 'Thread 2' },
    ]
    // const store = ({
    //   threads: {
    //     data: {
    //       threads: expectedThreads,
    //     },
    //   },
    // })

    // Act
    // const result = store.dispatch(useGetThreadsQuery())

    // Assert
    // expect(result).toEqual(expectedThreads)
  })
})