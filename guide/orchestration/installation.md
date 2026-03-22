# Installation
Getting Orchestration set up in your Laravel project is straightforward. Follow these steps to integrate the package and set up your first service.

## Prerequisites
Before you begin, ensure your development environment meets the following requirements:
- [PHP](https://www.php.net/) version 8.1 or higher.
- [Laravel](https://laravel.com/) version 10 or higher.

## Install via Composer
Orchestration can be easily added to any new or existing Laravel application using Composer. Run the following command in your project's root directory:
```bash
composer require payavel/orchestration
```

## Initialize with the Setup Wizard
Orchestration simplifies the initial setup through an Artisan command that guides you through the process. Start the setup wizard with:
```bash
php artisan orchestrate:service
```

Follow the interactive prompts to configure your first service. The wizard will guide you through these steps:
1. Choose the service to add (e.g., "Checkout").
2. Assign an identifier to the service.
3. Select the driver for the service (e.g., "config" or "database").
4. Add and configure service providers (e.g., "Adyen", "Stripe").
5. Set up accounts and link them to your providers.

Upon completion, orchestration will generate all necessary configuration files, contracts, and provider gateways, including a mock gateway for testing purposes.

::: info :memo: Note
The first time your run the `php artisan orchestrate:service` command, it creates a orchestration config file with your service configurations. For subsequent services, you must add them manually.
:::

This setup ensures a smooth start with orchestration, enabling you to focus on building your application without worrying about the intricacies of service integration.
