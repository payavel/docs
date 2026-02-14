# Console Commands

Checkout leverages Orchestration's console commands for management.

## Installation

When installing the package, you can run:

```bash
php artisan vendor:publish --tag=checkout-config
```

## Service Management

You can manage the checkout service using orchestration commands:

```bash
php artisan orchestrate:service --service=checkout
```

This launch the interactive wizard to configure providers and accounts for the checkout service.
