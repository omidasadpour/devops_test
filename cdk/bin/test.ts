#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { TestStack } from '../lib/test-stack';
import "source-map-support/register";

const app = new App();

// https://us-east-1.console.aws.amazon.com/organizations/v2/home/accounts
const OU = {
    Root: {
        id: "r-4gao",
        Workloads: {
            id: "135808930069",
            test: {
                account: "135808930069",
                arn: "arn:aws:organizations::135808930069:account/o-ck1uahvuid/135808930069",
            },
        }
    },
};

new TestStack(app, "test-us-east-1", {
    env: {
        account: OU.Root.Workloads.test.account,
        region: "us-east-1",
    },
});
