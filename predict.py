import json
import boto3
import pandas as pd

runtime = boto3.client('sagemaker-runtime')

def lambda_handler(event, context):
    # Extract input data from the event
    input_data = event.get('body', {
        'city': 'SAN FRANCISCO',
        'state_code': 'CA'
    })

    if isinstance(input_data, str):
        input_data = json.loads(input_data)

    df = pd.DataFrame([input_data])
    df_encoded = pd.get_dummies(df, columns=['city', 'state_code'], prefix=['city', 'state'])

    # Update this list based on your training data columns
    expected_columns = [
        'city_SAN FRANCISCO', 'city_NEW YORK',  # Replace with actual columns
        'state_CA', 'state_NY'  # Replace with actual columns
    ]

    for col in expected_columns:
        if col not in df_encoded.columns:
            df_encoded[col] = 0
    df_encoded = df_encoded[expected_columns]

    csv_data = df_encoded.to_csv(index=False, header=False)

    try:
        response = runtime.invoke_endpoint(
            EndpointName='RealEstatePredictor',
            ContentType='text/csv',
            Body=csv_data
        )
        result = json.loads(response['Body'].read().decode())
        return {
            'statusCode': 200,
            'body': json.dumps({'prediction': result})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }