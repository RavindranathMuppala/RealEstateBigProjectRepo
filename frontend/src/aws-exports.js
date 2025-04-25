const awsmobile = {
    aws_project_region: 'us-east-2',
    aws_appsync_graphqlEndpoint: '',
    aws_appsync_region: 'us-east-2',
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: '',
    aws_cloud_logic_custom: [
        {
            name: 'RealEstateAPI',
            endpoint: 'https://osgr3pwwsl.execute-api.us-east-2.amazonaws.com/prod',  // Placeholder; will update after API Gateway setup
            region: 'us-east-2'
        }
    ]
};
export default awsmobile;