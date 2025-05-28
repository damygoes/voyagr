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

  if (!API_URL) {
    throw new Error("API_URL is not configured");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  const res = await fetch(`${API_URL}/voyagr-api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: controller.signal,
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

  clearTimeout(timeoutId);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Registration failed");
  }

  return json.data.registerUser; // { user, token }
}
