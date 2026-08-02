variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Project name, used as prefix for resource naming"
  type        = string
  default     = "pradeep-oidc-practice"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}
