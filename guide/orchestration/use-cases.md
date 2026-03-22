# Use Cases

Payavel Orchestration is designed to be flexible, supporting your application's service integration needs at any stage of its lifecycle. Whether you are starting a new project, refactoring legacy code, or migrating between providers, orchestration provides the structure you need.

## 1. Service Wrapping (Day 1 Integration)

When building a new feature that relies on an external service (like a payment gateway or SMS provider), it's best practice to avoid coupling your application code directly to that provider's SDK or API.

**The Problem:**
Directly calling `Stripe::charge()` throughout your controllers makes it difficult to switch providers later or add redundancy (e.g., failover to PayPal if Stripe is down).

**The Orchestrator Solution:**
Use Orchestration from "Day 1" to define a contract for your service.

1.  **Define the Service:** Create a `payment` service.
2.  **Create a Provider:** Implement a `stripe` provider that adheres to your service's contract.
3.  **Consumption:** In your application, interact only with the `payment` service.

```php
// Instead of this:
// Stripe::charge($amount, $token);

// Do this:
$paymentService = Service::make('payment');
$paymentService->charge($amount, $token);
```

This approach standardizes your API integrations and makes your codebase cleaner and more maintainable from the start.

## 2. Refactoring for Testability (Mocking)

Legacy codebases often suffer from poor testability because external API calls are hardcoded, making it impossible to run efficient unit tests without hitting live endpoints.

**The Problem:**
Your tests are slow, flaky, or require complex external setups because classes instantiate 3rd party clients directly.

**The Orchestrator Solution:**
Refactor your integration points to use Orchestration, which introduces a consistent boundary for mocking.

1.  **Extract Logic:** Move the hardcoded API calls into a new Orchestration Provider.
2.  **Replace Calls:** Replace direct calls in your code with the Service call.
3.  **Mocking:** In your tests, you can now easily mock the entire service response without making HTTP requests.

```php
// In your test
$mockService = Service::fake('payment');
$mockService->shouldReceive('charge')->andReturn(new SuccessResponse());

// Your code runs without hitting the real API
$this->post('/checkout');
```

This allows you to test your application logic in isolation, ensuring your business rules work correctly regardless of the external service's status.

## 3. The Strangler Pattern (Migration)

The [Strangler Pattern](https://martinfowler.com/bliki/StranglerFigApplication.html) is a strategy for migrating a legacy system by gradually replacing specific pieces of functionality with new applications and services.

**The Problem:**
You have a legacy integration (e.g., `LegacyPaymentProvider`) that you want to replace with a modern one (e.g., `ModernPaymentProvider`), but the system is too large to rewrite all at once.

**The Orchestrator Solution:**
Orchestration acts as the routing layer, allowing you to gradually shift traffic.

1.  **Wrap the Legacy Code:** Create a `legacy` provider that simply calls your existing legacy classes.
2.  **Build the New Provider:** Create a `modern` provider with the new implementation.
3.  **Route Traffic:** Use the service configuration to route requests. You can start by routing 100% to `legacy`.
4.  **Gradual Rollout:**
    *   Route specific users or low-risk transactions to `modern`.
    *   Monitor performance and errors.
    *   Gradually increase the traffic to `modern` until `legacy` can be decommissioned.

```php
$service = Service::make('payment');

// Conditional routing (e.g., rolled out to beta users)
if ($user->isBetaTester()) {
    $service->provider('modern');
} else {
    $service->provider('legacy');
}

$service->charge(...);
```
