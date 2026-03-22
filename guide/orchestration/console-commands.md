# Console Commands

Payavel provides several Artisan commands to help you manage your services and configurations across both Orchestration and Checkout packages.

## `orchestrate:service`

This is the primary command to set up or modify a service.

```bash
php artisan orchestrate:service [options]
```

### Options
- `--service=`: The name of the service (e.g., `payment`).
- `--driver=`: The driver to use (`config` or `database`).

### Interactive Mode
If run without arguments, the command launches an interactive wizard that guides you through:
1.  Naming the service.
2.  Choosing a driver.
3.  Adding providers.
4.  Adding accounts.

## `orchestrate:provider`

Adds a new provider to an existing service.

```bash
php artisan orchestrate:provider [options]
```

### Options
- `--service=`: The name of the service to add the provider to.
- `--provider=`: The name/ID of the new provider.

## `orchestrate:stubs`
Publishes the package stubs to `stubs/payavel/orchestration` for customization.

```bash
php artisan orchestrate:stubs
```

Use this if you want to modify the templates used for generating service files, contracts, or migrations.
