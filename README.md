# Single-Page Application Template

Template for creating React + Vite single-page applications with AWS deployment infrastructure.

## Features

- React 18 + Vite for fast development
- Modern JavaScript with ES modules
- GitHub Actions CI/CD workflow
- Terraform infrastructure for AWS (S3 + CloudFront + Route53)
- Automatic deployments to AWS on main branch

## Getting Started

### 1. Use this template

Click "Use this template" on GitHub or manually copy the files to your new repository.

### 2. Replace placeholders

Find and replace the following placeholders throughout the project:

- `{{PROJECT_NAME}}` - Your project slug (e.g., "my-app")
- `{{PROJECT_TITLE}}` - Your project display title (e.g., "My App")
- `{{PROJECT_DESCRIPTION}}` - Brief description of your project
- `{{DOMAIN_NAME}}` - Your custom domain (e.g., "my-app.stackgobrr.com")

Files containing placeholders:
- `package.json`
- `index.html`
- `src/App.jsx`
- `infra/versions.tf`
- `infra/variables.tf`
- `infra/terraform.tfvars.example`
- `.github/workflows/deploy.yml`

### 3. Install dependencies

```bash
npm install
```

### 4. Run locally

```bash
npm run dev
```

## Deployment

### Prerequisites

1. AWS account with S3, CloudFront, Route53, and ACM access
2. Route53 hosted zone for your domain
3. GitHub repository secrets configured:
   - `AWS_ROLE_ARN` - IAM role ARN for OIDC authentication
4. GitHub repository variables:
   - `HOSTED_ZONE_ID` - Route53 hosted zone ID

### Terraform Setup

1. Copy the example tfvars file:
```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
```

2. Update `terraform.tfvars` with your values

3. Initialize and apply Terraform (this is automated in CI/CD):
```bash
terraform init
terraform plan
terraform apply
```

### Automatic Deployments

The GitHub Actions workflow will automatically:
1. Build the React application
2. Deploy infrastructure with Terraform
3. Sync files to S3
4. Invalidate CloudFront cache

Deployments trigger on pushes to `main` branch.

## Project Structure

```
.
├── src/
│   ├── main.jsx          # Application entry point
│   ├── App.jsx           # Root component
│   └── index.css         # Global styles
├── infra/
│   ├── main.tf           # Infrastructure configuration
│   ├── versions.tf       # Terraform and provider versions
│   ├── variables.tf      # Input variables
│   ├── outputs.tf        # Output values
│   └── terraform.tfvars.example
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD pipeline
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Node dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Infrastructure

The template includes Terraform configuration for:

- **S3 Bucket** - Static file hosting
- **CloudFront** - CDN with custom domain
- **ACM Certificate** - SSL/TLS certificate
- **Route53** - DNS records

All infrastructure is managed through the `tf-module-aws-frontend` module.
