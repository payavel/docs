# Drivers

Payavel Orchestration comes with two primary drivers for managing your service configurations: **Config** and **Database**. You can choose the one that best fits your application's architecture.

## Config Driver

The **Config Driver** is the default driver. It stores all service configurations, providers, and accounts within your config files (e.g., `config/orchestration.php` or `config/checkout.php`).

### Use Cases
- **Simple Integrations**: When you have a static set of providers and accounts.
- **Version Control**: When you want to track configuration changes via Git.
- **Performance**: Accessing config files is generally faster than database queries.

### Setup
Ensure your `orchestration.php` defaults to the config driver:

```php
'defaults' => [
    'driver' => 'config',
],
```

## Database Driver

The **Database Driver** allows you to manage services, providers, and accounts dynamically via database tables. This is ideal for applications where configurations need to be updated at runtime without deployment.

### Use Cases
- **Multi-Tenancy**: When different users bring their own provider credentials.
- **Dynamic Configuration**: When you need to add or update providers/accounts via an admin panel.

### Setup

To use the database driver, you first need to generate the necessary migrations.

1. **Generate Migrations**:
   Run the `orchestrate:service` command with the `--driver=database` option, or update an existing service configuration.

   When creating a new service with the database driver, Orchestration will generate a migration file to create the following tables:
   - `services`
   - `providers`
   - `accounts`
   - `account_provider` (pivot table)

2. **Run Migrations**:
   ```bash
   php artisan migrate
   ```

3. **Configure the Service**:
   Update your service configuration (e.g., `config/payment.php`) to use the database driver:

   ```php
   'defaults' => [
       'driver' => 'database',
   ],
   ```

### Custom Models

The Database Driver uses Eloquent models to interact with the tables. You can customize these models in your `config/orchestration.php` file if you need to add relationships or custom logic.

```php
'models' => [
    \Payavel\Orchestration\Models\Service::class => \App\Models\Service::class,
    \Payavel\Orchestration\Models\Provider::class => \App\Models\Provider::class,
    \Payavel\Orchestration\Models\Account::class => \App\Models\Account::class,
],
```

Make sure your custom models extend the base Orchestration models or implement the corresponding interfaces.
