export async function registerUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/voyagr-api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      mutation RegisterUser($email: String!, $password: String!, $name: String!) {
        registerUser(email: $email, password: $password, name: $name) {
          user {
            id
            name
            email
            permissions
          }
          token
        }
      }
    `,
      variables: { email, password, name },
    }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Registration failed");
  }

  return json.data.register; // { user, token }
}
