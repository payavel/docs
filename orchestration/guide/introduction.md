# What is Payavel?

Payavel is a comprehensive ecosystem for Laravel developers, designed to streamline service orchestration and payment integration. It provides a unified way to manage multiple service providers—whether they are payment gateways, shipping providers, or any other API-driven service—through a single, consistent API.

The ecosystem consists of two primary packages:

1.  **Orchestration**: The core framework that handles service providers, accounts (merchants), and driver resolution. It allows you to decouple your code from specific third-party implementations.
2.  **Checkout**: A specialized implementation on top of Orchestration, focused specifically on payment processing. It provides ready-to-use drivers for popular gateways like Stripe and Braintree.

## Why Payavel?

Integrating third-party services often leads to tight coupling, where your application logic becomes entangled with the specifics of a provider's SDK. Switching providers or managing multiple accounts for the same provider (e.g., multi-tenant platforms) becomes a nightmare of conditionals and duplicated code.

Payavel solves this by introducing a **Service Orchestration** layer. You define the *intent* (e.g., "collect payment"), and Payavel resolves the correct provider and account configuration at runtime, routing the request through the appropriate driver.

## Key Features

-   **Unified API**: Interact with multiple providers using a single, fluent interface.
-   **Multi-Tenancy**: Easily manage different credentials and configurations for different users or accounts.
-   **Hot-Swappable Drivers**: Switch underlying providers without changing your business logic.
-   **Developer Experience**: Built-in scaffolding, mocking for tests, and intuitive configuration.
