output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = module.frontend.s3_bucket_name
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = module.frontend.cloudfront_distribution_id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = module.frontend.cloudfront_domain_name
}

output "artifacts_bucket_name" {
  description = "Name of the artifacts S3 bucket"
  value       = module.frontend.artifacts_bucket_name
}

output "website_url" {
  description = "URL to access the site"
  value       = module.frontend.website_url
}

output "certificate_arn" {
  description = "ARN of the ACM certificate (if using custom domain)"
  value       = module.frontend.certificate_arn
}
