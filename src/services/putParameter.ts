import AWS from "aws-sdk";
AWS.config.update({ region: 'ap-southeast-1' });

const ssm = new AWS.SSM() as AWS.SSM;

export const putParameter = async (name: string, value: string): Promise<AWS.SSM.PutParameterResult> => {
  const result = await ssm.putParameter({
    "Name": name,
    "Type": "String",
    "Overwrite": true,
    "Value": value
  }).promise();

  return result;
};
