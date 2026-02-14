# Basic Usage

Once installed and configured, you can start using the Checkout service to process payments.

## Charging a Customer

To charge a customer, you can use the `Checkout` facade or the service instance.

```php
use Payavel\Checkout\Facades\Checkout;

$response = Checkout::charge([
    'amount' => 1000, // Amount in cents
    'currency' => 'USD',
    'source' => $token, // Payment source token
]);

if ($response->isSuccessful()) {
    // Payment successful
}
```

## Retrieving Models

You can retrieve the current provider and account:

```php
$provider = Checkout::getProvider();
$account = Checkout::getAccount();
```

## Switching Providers

You can switch providers at runtime:

```php
Checkout::provider('braintree')->charge(...);
```
