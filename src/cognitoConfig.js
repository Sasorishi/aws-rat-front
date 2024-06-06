import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_lUaM6mnqj",
  ClientId: "6k3g5oh9q8199t8ehqdl2nfr45",
  //   ClientSecret: "5dlu70e3hr4rpm2569dr29hn332fhidj47h8ki1hccbe98giv6q",
};

const Pool = new CognitoUserPool(poolData);

export default Pool;
export const { ClientId, ClientSecret } = poolData;
