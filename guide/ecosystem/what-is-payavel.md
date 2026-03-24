# What is Payavel?

Payavel is an initiative dedicated to providing the ultimate modular commerce ecosystem for Laravel developers.

Rather than enforcing a rigid, out-of-the-box solution, Payavel gives developers the flexible tools needed to construct their own custom **End-to-End (E2E)** revenue workflows. It comprises a suite of **independent packages** that work harmoniously to manage every aspect of the modern "revenue lifecycle".

## The Ecosystem

Payavel's packages are beautifully decoupled, allowing you to adopt exactly what you need, when you need it:

- **Catalog:** Centralize and manage your product catalog, intricate pricing models, and variants. This provides a single source of truth for what you sell, and at what price.
- **Checkout:** Confidently process payments, authorizations, and refunds. You can route these requests dynamically across one or more payment service providers (e.g., Stripe, Braintree) without tangling provider-specific SDK logic into your controllers.
- **Risk:** Protect your business from bad actors with fraud prevention hooks, risk evaluation, and chargeback management integrations.
- **Subscription:** Master the complexities of recurring revenue gracefully. Manage active billing cycles, renewals, dunning, and prorations on your own terms.
- **Recognition:** Consolidate financial data across multiple providers. Simplify revenue recognition, accounting workflows, and reporting into a single, unified format.

If you choose to use the complete suite, you can achieve a true E2E commerce solution with unified, beautiful code. But if you only need a straightforward payment authorization process, the Checkout package shines perfectly on its own.

## Why Payavel?

While direct API integrations can get the job done, they often lead to tight coupling. If you ever need to switch gateways or manage multiple environments, you end up rewriting core business logic.

To eliminate this friction, Payavel leverages a powerful **Orchestration Layer** at the core of all its packages. You write your business logic once against a unified API, and Payavel automatically resolves the correct provider and account configurations on the fly, making it incredibly easy to hot-swap gateways without ever touching your core application code.

## Dive Deeper

Ready to see how Orchestration accomplishes this under the hood? Check out the [Architecture & Features](./features.md) page to learn about our unified service API, auto-generated scaffolding, and powerful multi-driver support.
