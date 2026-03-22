# What is Payavel?

Payavel is an organization dedicated to providing the ultimate modular commerce ecosystem for Laravel developers. 

Rather than enforcing a rigid, out-of-the-box solution, Payavel gives developers the flexible tools needed to construct their own custom **End-to-End (E2E)** revenue workflows. We provide a suite of **independent packages** that work harmoniously to manage every aspect of the modern "revenue lifecycle."

## The Ecosystem

Payavel provides various packages that are beautifully decoupled, allowing you to adopt exactly what you need, when you need it:

- **Catalog (Revenue Structure):** Centralize and manage your product catalog, pricing models, and variants.
- **Checkout (Revenue Capture):** Securely process and orchestrate one-time payments and authorizations across multiple gateways (e.g., Stripe, Braintree).
- **Fraud (Revenue Assurance):** Protect your business with built-in fraud prevention, risk evaluation, and chargeback management integrations.
- **Subscriptions (Revenue Retention):** Handle recurring billing, lifecycle renewals, dunning, and prorations effortlessly.
- **Reporting (Revenue Recognition):** Consolidate data from multiple providers to simplify revenue recognition and financial reporting.

If you choose to use the complete suite, you can achieve a true E2E commerce solution with unified, beautiful code. But if you only need a straightforward card authorization process, the Checkout package shines perfectly on its own.

## Why Payavel?

Integrating third-party payment, billing, and fraud-prevention gateways usually leads to tight coupling. Your application logic becomes entangled with the specifics of a provider's SDK. Switching providers or managing multiple accounts (such as in multi-tenant platforms) quickly escalates into a nightmare of conditionals and duplicated code.

Payavel eliminates this complexity by introducing a unified **Orchestration Layer** underlying all its packages. You state your *intent* (e.g., "process this payment" or "cancel this subscription"), and Payavel resolves the correct provider and account configuration at runtime, routing the request through the appropriate driver automatically.

## Key Features

- **Modular & Independent**: Adopt individual packages (Checkout, Subscriptions, Catalog, etc.) entirely independently. Eliminate the bloat of an inflexible monolith.
- **E2E Capable**: When combined by the developer, the packages provide everything needed for comprehensive revenue management.
- **Unified API**: Interact seamlessly with multiple providers using a single, fluent interface.
- **Multi-Tenancy**: Easily provision and manage discrete credentials and configurations for different merchants or accounts within the same application.
- **Hot-Swappable Drivers**: Switch underlying providers—or migrate between gateways—without needing to rewrite your core business logic.
- **Developer Experience**: Benefit from built-in architecture scaffolding, confident mocking capabilities for testing, and intuitive configuration.
