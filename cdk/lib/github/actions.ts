import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import {
    GithubActionsIdentityProvider,
    GithubActionsRole,
} from "aws-cdk-github-oidc";

export interface GitHubActionsProps {}

export class GitHubActions extends Construct {
    constructor(scope: Construct, id: string, props: GitHubActionsProps) {
        super(scope, id);

        const owner = "omidasadpour";
        const repo = "devops_test";

        const policyStatement = new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["sts:AssumeRole"],
            resources: ["arn:aws:iam::*:role/cdk-*"],
        });

        const provider = new GithubActionsIdentityProvider(
            scope,
            "GithubProvider"
        );

        const cdkDiffRole = new GithubActionsRole(scope, "cdkDiffRole", {
            roleName: "cdk-diff",
            provider: provider,
            owner,
            repo,
            filter: "pull_request",
        });

        cdkDiffRole.addToPolicy(policyStatement);

        const cdkDeployToProdRole = new GithubActionsRole(
            scope,
            "CDKDeployToProdRole",
            {
                roleName: "cdk-deploy-to-prod",
                provider: provider,
                owner,
                repo,
                filter: "ref:refs/heads/main",
            }
        );

        cdkDeployToProdRole.addToPolicy(policyStatement);
    }
}
