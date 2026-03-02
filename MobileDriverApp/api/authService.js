export const register = async (name, email, password) => {
  const res = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    role: "driver",
  });

  // Store token securely in Keychain
  await Keychain.setGenericPassword(email, res.data.token);

  return res.data.user;
};