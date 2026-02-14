# Drivers

Checkout supports a variety of payment gateways through drivers.

## Config Driver

The default driver is `config`, which relies on `config/checkout.php`.

## Database Driver

The `database` driver allows dynamic configuration of providers and accounts.

## Payment Gateway Drivers

Checkout comes with built-in support for:

- **Stripe**: `payavel/checkout-stripe`
- **Braintree**: `payavel/checkout-braintree`
- **Adyen**: `payavel/checkout-adyen`

### Creating a Custom Driver

You can create your own driver by implementing the `Payavel\Checkout\Contracts\Gateway` interface.
