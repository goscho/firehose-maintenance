import { authenticate, AuthenticationOptions } from "ldap-authentication";

interface User {
  id: string;
  name: string | null;
}

const buildLdapOptions = (
  username: string,
  userPassword: string,
): AuthenticationOptions => {
  const url = process.env.AUTH_LDAP_SERVER_URL;

  if (!url) {
    throw new Error("AUTH_LDAP_SERVER_URL not set in environment");
  }

  return {
    ldapOpts: {
      url: process.env.AUTH_LDAP_SERVER_URL,
      // tlsOptions: { rejectUnauthorized: false }
    },
    userDn: `cn=${username},ou=users,dc=example,dc=org`,
    userPassword,
    userSearchBase: "dc=example,dc=org",
    usernameAttribute: "uid",
    username,
    // starttls: false
  };
};

/**
 * Authenticates a user by verifying their credentials against an external system.
 *
 * @param {string} username - The username of the user attempting to authenticate.
 * @param {string} password - The password associated with the provided username.
 * @return {Promise<User | null>} A promise that resolves to a `User` object if authentication is successful, or `null` if authentication fails.
 */
async function authenticateUser(
  username: string,
  password: string,
): Promise<User | null> {
  const options = buildLdapOptions(username, password);
  try {
    const result = await authenticate(options);
    console.debug("authenticateUser:", result);
    return {
      id: result.uidNumber,
      name: result.uid,
    };
  } catch (error) {
    console.error("authenticateUser error:", error);
  }
  console.debug("authenticateUser: no user found");
  return null;
}

export { authenticateUser };
export type { User };
