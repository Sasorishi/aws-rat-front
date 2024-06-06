import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "./cognitoConfig";

export const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    Pool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export const signIn = (email, password) => {
  const user = new CognitoUser({
    Username: email,
    Pool,
  });

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // Gérer le cas où un nouveau mot de passe est requis
        // Vous pouvez rediriger l'utilisateur vers une page où il peut fournir un nouveau mot de passe
        // ou demander au backend de générer un nouveau mot de passe
        console.log("New password required");
        resolve({
          newPasswordRequired: true,
          userAttributes,
          requiredAttributes,
        });
      },
    });
  });
};

export const signOut = () => {
  const user = Pool.getCurrentUser();
  if (user) {
    user.signOut();
  }
};
