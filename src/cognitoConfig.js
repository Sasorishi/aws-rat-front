import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_0cGDKv5yB",
  ClientId: "50a619g8bss1hsg5vimgc6i03n",
};

const Pool = new CognitoUserPool(poolData);

export default Pool;
export const { ClientId, ClientSecret } = poolData;
