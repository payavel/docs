# Installation

Checkout requires PHP 8.1+ and Laravel 10+.

## Install via Composer

You can install the package via composer:

```bash
composer require payavel/checkout
```

## Publish Configuration

After installing the package, you should publish the configuration file:

```bash
php artisan vendor:publish --tag=checkout-config
```

This will create a `config/checkout.php` file where you can configure your payment providers.

## Run Migrations

If you plan to use the database driver (recommended for dynamic configurations), you should run the migrations:

```bash
php artisan migrate
```
