import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as ecrAssets from "aws-cdk-lib/aws-ecr-assets";
import { GitHubActions } from "./github";

export class TestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // create GitHub Actions Construct
    new GitHubActions(this, "github-actions", {});

    // Create a VPC
    const vpc = new ec2.Vpc(this, "TestVpc", {
      maxAzs: 3,
    });

    // Create an ECS Cluster
    const cluster = new ecs.Cluster(this, "TestCluster", {
      vpc,
    });

    // Define a Docker image asset
    const dockerImage = new ecrAssets.DockerImageAsset(this, "SampleAppImage", {
      directory: "../",
      file: "Dockerfile"
    });

    // Create a Fargate service with a load balancer
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      "TestFargateService",
      {
        cluster,
        memoryLimitMiB: 512,
        cpu: 256,
        desiredCount: 1,
        taskImageOptions: {
          image: ecs.ContainerImage.fromDockerImageAsset(dockerImage),
          containerPort: 80,
        },
        publicLoadBalancer: true, // Expose the service to the internet
      }
    );

    // Add scaling policy
    const scalableTarget = fargateService.service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 2,
    });

    scalableTarget.scaleOnCpuUtilization("CpuScaling", {
      targetUtilizationPercent: 90,
    });

    // Output the Load Balancer DNS
    new CfnOutput(this, "LoadBalancerDNS", {
      value: fargateService.loadBalancer.loadBalancerDnsName,
      description: "The DNS address of the load balancer",
    });
  }
}
