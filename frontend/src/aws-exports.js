const awsmobile = {
  aws_project_region: 'us-east-2',
  aws_appsync_graphqlEndpoint: 'https://yl47kwdn47.execute-api.us-east-2.amazonaws.com/prod/graphql',
  aws_appsync_region: 'us-east-2',
  aws_appsync_authenticationType: 'API_KEY',
  aws_cognito_identity_pool_id: null,
  aws_cognito_region: null,
  aws_user_pools_id: null,
  aws_user_pools_web_client_id: null,
  oauth: {},
  aws_cognito_login_mechanisms: [],
  aws_cognito_signup_attributes: [],
  aws_cognito_mfa_configuration: null,
  aws_cognito_mfa_types: [],
  aws_cognito_password_protection_settings: null,
  aws_cloud_logic_custom: [
    {
      name: 'RealEstatePredictorAPI',
      endpoint: 'https://yl47kwdn47.execute-api.us-east-2.amazonaws.com/prod',
      region: 'us-east-2'
    }
  ]
};
export default awsmobile;
