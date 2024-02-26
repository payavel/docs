# Configuration
Orchestration's flexibility comes from its extensive configuration options. Here, we'll guide you through the essential settings to get you up and running.

## Global Configuration
Upon initializing orchestration using the [setup wizard]('/guide/installation#initialize-with-the-setup-wizard), a "config/orchestration.php" file is created. This serves as your global configuration, applying default settings across all services unless overridden by service-specific configurations.

### Initial Setup
Your orchestration config file should initially look like this:
```php
return [

    'defaults' => [
        'driver' => 'config',
    ],

    'services' => [

        'checkout' => 'checkout',

    ],

];
```

#### Key Configuration Elements
- **Defaults**: Set the default driver to resolve your services.
- **Drivers**: Register custom drivers here, if any.
- **Test Mode**: Control the test mode application-wide.
- **Model Overrides**: Override orchestration models.

#### Customizing Defaults and Drivers
Set your preferred default driver and register any custom drivers you've developed.
```php
return [

    'defaults' => [
        'driver' => 'config',
    ],

    'drivers' => [
        'config' => \Payavel\Orchestration\Drivers\ConfigDriver::class,
        'custom' => \App\Services\Drivers\CustomDriver::class,
    ],

];
```
:::warning :warning: Warning
When registering custom drivers, make sure to also include any standard drivers if needed.
:::

#### Enabling Test Mode
Toggle test mode via the configuration file or ".env" for broader testing flexibility.
```php
return [

    'test_mode' => env('ORCHESTRATION_TEST_MODE', false),

];
```

#### Overriding Models
If needed, specify custom models to extend or modify the prebuilt orchestration models.
```php
return [

    'models' => [
        \Payavel\Orchestration\Models\Provider::class => \App\Models\Provider::class,
        \Payavel\Orchestration\Models\Merchant::class => \App\Models\Merchant::class,
    ],

];
```
:::info :memo: Note
Overriding models only applies when using the database driver.
:::

## Service-Specific Configuration
Configurations within a service's dedicated file (e.g., "checkout.php") take precedence over global settings ("orchestration.php").
```php
// config/orchestration.php
return [

    'services' => [

        'checkout' => 'checkout',

    ],

    'test_mode' => env('ORCHESTRATION_TEST_MODE', false),

];

// config/checkout.php
return [

    'test_mode' => env('CHECKOUT_TEST_MODE', false),

];
```

You can set up configurations for each service in the "orchestration.php" file. This is useful for the database driver, which doesn't rely on settings in the service-specific config files.
```php
return [

    'services' => [

        'checkout' => [
            'test_mode' => env('CHECKOUT_TEST_MODE', false),
        ],

    ],

    'test_mode' => env('ORCHESTRATION_TEST_MODE', false),

];
```

### Configuring Services
- Define service-specific behaviors, such as test modes or default parameters.
- Register providers, merchants, and their respective configurations.

#### Setting Defaults
Set default driver, provider, and merchant for the service to streamline gateway interactions.
```php
return [

    'defaults' => [
        'driver' => 'config',
        'provider' => 'adyen',
        'merchant' => 'payavel',
    ],

];
```
:::warning :warning: Warning
It only makes sense to specify a default merchant when it is application specific, where you don't orchestrate multiple accounts for a single service provider.
:::

#### Configuring Testing
Assign a fake gateway for the service to facilitate isolated testing.
```php
return [

    'test_gateway' => \App\Services\Checkout\FakeCheckoutRequest::class,

];
```

#### Registering Providers and Merchants
- Detail each provider's configuration.
- List merchants using the service and specify their provider configurations.

```php
return [

    'providers' => [

        'adyen' => [
            'gateway' => \App\Services\Checkout\AdyenCheckoutRequest::class,
        ],

        'stripe' => [
            'gateway' => \App\Services\Checkout\StripeCheckoutRequest::class,
        ],

    ],

    'payavel' => [
        'providers' => [
            'adyen' => [
                'api_key' => env('ADYEN_PAYAVEL_API_KEY'),
            ],
            'stripe' => [
                'api_key' => env('STRIPE_PAYAVEL_API_KEY'),
            ],
        ],
    ],

];
```

By following these guidelines, you can tailor orchestration to fit your application's needs, ensuring a smooth integration and management process for multiple services.
