# What is Checkout?

**Payavel Checkout** is a Laravel package designed to simplify the integration of payment gateways into your application. Built on top of [Payavel Orchestration](/orchestration/), it provides a standardized way to handle payments, subscriptions, and customers across multiple providers.

## Why use Checkout?

Integrating payment gateways can be complex, especially when supporting multiple providers (e.g., Stripe, PayPal, Braintree). Checkout abstracts firmly the underlying API differences, allowing you to:

- **Switch Providers Easily**: Change your payment provider by updating a configuration file.
- **Unified Interface**: Use a consistent API for charges, refunds, and customer management.
- **Reduced Boilerplate**: Focus on your business logic instead of writing adapter code for each gateway.

## How it Works

Checkout leverages the power of Orchestration to manage service providers. It comes pre-configured with a 'checkout' service and supports drivers for popular gateways.

When you make a call like `Checkout::charge(...)`, the package resolves the default provider (e.g., Stripe) and executes the request using the appropriate gateway implementation.
