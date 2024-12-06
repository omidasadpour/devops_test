## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## CDK

### Overview

This project uses AWS CDK to set up a containerized application pipeline with ECS using Fargate and integrates GitHub Actions for automation. The deployment process involves using Amazon ECR to store Docker images and automating infrastructure changes using GitHub Actions and CDK.

### Usage Instructions

#### 1. **Change the Organizational Unit (OU) Details in `test.ts`**

To configure the infrastructure for your environment, update the **OU (Organizational Unit)** details in the `test.ts` file to match your AWS organization setup. Ensure that the `account`, `arn`, and `region` reflect the actual values for your environment. You can find your AWS account details by navigating to [AWS Organizations Console](https://us-east-1.console.aws.amazon.com/organizations/v2/home/accounts).

#### 2. Local Development Setup (Access Key & Secret Key)
For local development, you can use your AWS access key and secret key for authentication. There is no need for additional configuration if you already have these credentials set up in your environment.

To configure your AWS credentials locally, follow these steps:

Set the environment variables in your terminal (or configure them via the AWS CLI or SDK):

```bash
export AWS_ACCESS_KEY_ID="your-access-key-id"
export AWS_SECRET_ACCESS_KEY="your-secret-access-key"
export AWS_DEFAULT_REGION="us-east-1"  # or the region you're using
```

Alternatively, you can use the AWS CLI to configure the credentials globally:

```bash
aws configure
```

Once this is set up, you can proceed with the CDK deployment without needing further configuration.

#### 3. **Run CDK Bootstrap (One-Time Setup)**

Before deploying any infrastructure, you need to bootstrap your AWS environment with CDK. This is a one-time setup that initializes the necessary resources for CDK to deploy.

To run the CDK bootstrap, use the following command:

```bash
cdk bootstrap
```

This will prepare your environment for CDK deployments by setting up the necessary resources, such as an S3 bucket for storing assets and a CloudFormation stack.

#### 4. Automation
If you have already enabled OIDC (OpenID Connect) and have your own roles configured, you can modify the ARN roles in the GitHub Actions files and remove the GitHub Actions Construct from `cdk/lib/test-stack.ts`. If you don't have OIDC and roles set up, you will need to refer to this [GitHub documentation](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) to configure it manually.

Alternatively, you can use the provided CDK code to automatically configure OIDC and the roles. Just remember to run the CDK code locally. If you don’t have OIDC and roles, you won't be able to use the automation process, as the GitHub Actions authentication with AWS is done through OIDC (which is the best practice solution).
