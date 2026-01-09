variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "eu-west-2"
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "spa-template"
}

variable "domain_name" {
  description = "Custom domain name for the site"
  type        = string
  default     = "spa-template.stackgobrr.com"
}

variable "hosted_zone_id" {
  description = "Route53 hosted zone ID for stackgobrr.com"
  type        = string
  default     = ""
}

variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100" # US, Canada, Europe
}
