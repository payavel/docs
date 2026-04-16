# Getting Started

The orchestration package provides a robust, standardized architecture for integrating third-party services into your Laravel application. By decoupling your business logic from external dependencies, Orchestration allows you to seamlessly swap out providers, route traffic, and mock APIs locally without touching your core application code.

## Prerequisites
- [PHP](https://www.php.net/) 8.1+
- [Laravel](https://laravel.com/) 10.0+

## Installation
Add the package to your application using Composer:
```bash
composer require payavel/orchestration
```

## Setup Wizard
Orchestration provides a helpful setup wizard to generate your first service:
```bash
php artisan orchestrate:service
```

The wizard will interactively guide you to:
1. Name the service (e.g., "Checkout").
2. Choose a configuration driver (`config` or `database`).
3. Set up the providers (e.g., "Stripe", "Adyen").
4. Link accounts to those providers.

Once completed, the command generates your baseline contracts, provider gateways, a fake gateway for testing, and the necessary configuration files.

## Configuration

With the baseline setup complete, your next priority is configuring your service appropriately. Orchestration offers a highly flexible configuration system supporting multiple drivers, test modes, and granular provider/account setups.

Check out the [Configuration Guide](/guide/orchestration/configuration-guide) to learn how to manage your global and service-specific settings, accounts, and testing gateways.
