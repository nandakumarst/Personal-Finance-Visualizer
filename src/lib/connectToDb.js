// Temporary local storage solution
export async function connectToDatabase() {
  return {
    conn: null,
    promise: Promise.resolve()
  };
}
