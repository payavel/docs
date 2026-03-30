# Routing Payments

Payavel Checkout builds squarely upon the powerful Orchestration engine, giving you total flexibility over precisely *where* and *how* your requests are pushed.

## Automatic Resolution

If you do not explicitly stipulate a provider or account when dispatching your request, Checkout will intelligently fall back to the default configuration defined inside your `checkout.php` file.

```php
// config/checkout.php

'defaults' => [
    'driver' => 'config',
    'provider' => 'stripe',
    'account' => 'us_b2c',
],
```

Because of the configuration above, executing a request via the facade without setting a provider will automatically be dispatched to your `us_b2c` account:

```php
use Payavel\Checkout\Facades\Checkout;

// This will use 'stripe' as the provider and 'us_b2c' as the account!
$response = Checkout::authorize([
    // ...
]);
```

## Dynamic Resolution

More often than not, large-scale applications use multiple payment gateways simultaneously. While this notoriously leads to messy codebases riddled with `if/else` gateway-specific implementations, Checkout abstracts that pain away entirely.

You can seamlessly orchestrate between your providers dynamically based on your application's real-time context.

### Example: Routing by IP Address (Region)

Let's assume your application serves a global audience. While Stripe might be your go-to processor in the US, perhaps Adyen performs better (or cheaper) for your European consumer base. 

```php
use Payavel\Checkout\Facades\Checkout;

// Determine provider based on the request's origin
$provider = $request->isUsIp() ? 'stripe' : 'adyen';

$response = Checkout::provider($provider)->authorize([
    // Unchanged, standardized payment data!
]);
```

### Example: Routing by User Context

If you are a multi-tenant application or use specialized merchant accounts depending on the user or the product being sold, you can easily shift between those accounts on the fly:

```php
use Payavel\Checkout\Facades\Checkout;

$account = $user->company->isEnterprise() ? 'us_b2b' : 'us_b2c';

$response = Checkout::provider('stripe')->account($account)->authorize([
    // Unchanged, standardized payment data!
]);
```

### Example: Capturing a Payment

Because Checkout models natively remember their origin, they seamlessly resolve their own provider and account configurations under the hood. For instance, when it's time to capture a hold that was previously authorized, you do not need to repeat any routing logic on your end.

```php
// Simply call the method directly on the model, and Checkout will powerfully route 
// the request to the exact same provider & account that originally authorized it!
$response = $payment->capture();

// Similarly, you can instantly refund or void transactions right from the model.
$response = $payment->void();
$response = $payment->refund();
```

The true power of this architecture is that the business logic leading up to the transaction—and the data being dispatched—stays consistently unified, while the underlying gateway endpoints resolve dynamically!
