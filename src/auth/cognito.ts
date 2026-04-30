import { ENV } from "../constants/env";

export const buildCognitoLoginUrl = () => {
  const params = new URLSearchParams({
    client_id: ENV.AWS_COGNITO_APP_CLIENT_ID,
    response_type: "code",
    scope: "email openid profile",
    redirect_uri: ENV.AWS_COGNITO_REDIRECT_URI,
  });

  return `${ENV.AWS_COGNITO_DOMAIN}/login?${params.toString()}`;
};
