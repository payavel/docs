# Configuration

After publishing the configuration file, you will find it at `config/checkout.php`. This file allows you to configure your payment providers, merchants, and other settings.

## Service Configuration

The checkout service configuration is where you define your defaults and registered providers.

```php
return [

    'defaults' => [
        'driver' => 'config',
        'provider' => 'stripe',
        'account' => 'default',
    ],

    'providers' => [
        'stripe' => [
            'gateway' => \Payavel\Checkout\Drivers\Stripe\Gateway::class,
        ],
    ],

    'accounts' => [
        'default' => [
            'providers' => [
                'stripe' => [
                    'api_key' => env('STRIPE_SECRET'),
                ],
            ],
        ],
    ],

];
```

## Supported Drivers

The `driver` option controls how the configuration is retrieved. You can use:
- `config`: (Default) Loads configuration from the config file.
- `database`: Loads configuration from the database.

See the [Drivers](/guide/drivers) section for more details.
