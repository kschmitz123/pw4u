export const getPassword = async (passwordName) => {
  const response = await fetch(`/api/passwords/${passwordName}`);
  const password = await response.text();
  return password;
};

export const deletePassword = async (passwordName) => {
  await fetch(`/api/passwords/${passwordName}`, {
    method: "DELETE",
  });
};

export const postPassword = async (passwordName, passwordValue) => {
  const response = await fetch("/api/passwords/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: passwordName, value: passwordValue }),
  });
  const newPassword = await response.text();
  return newPassword;
};
