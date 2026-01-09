terraform {
  required_version = ">= 1.14.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket = "stackgobrr-projects-terraform-state"
    key    = "spa-template/terraform.tfstate"
    region = "eu-west-2"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "spa-template"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Provider for ACM certificate (CloudFront requires certificates in us-east-1)
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = "spa-template"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
