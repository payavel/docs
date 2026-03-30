# Getting Started

Getting up and running with Payavel Checkout is a breeze. Since it is built on top of Payavel Orchestration, installing Checkout will automatically pull in the underlying core if it isn't already installed in your application.

## Installation

You can install the package via composer:

```bash
composer require payavel/checkout
```

After installing the package, run the automated installation command and simply follow the interactive console prompts to configure the service to your liking:

```bash
php artisan checkout:install
```

> [!TIP] 
> This command extends `payavel:orchestrate`, automatically handling the boilerplate of setting up a new service in your application. It securely publishes the necessary stubs and initializes the configuration.

### Driver Choices

During the installation prompt, you will be asked to choose a **driver** for the Checkout service. This dictates how your provider and merchant account configurations will be managed:

- **Config Driver**: The default approach. Choose this if your payment integration settings are relatively static, you prefer version-controlled configurations, or you want the maximum performance of file-based config retrieval. Your credentials will be handled directly in `config/checkout.php` via your `.env` variables.
- **Database Driver**: Choose this if your application is multi-tenant (i.e. different users bring their own provider credentials) or if you need to dynamically add and manage merchant accounts via an admin panel at runtime. This driver stores your integration details in the database.

> [!NOTE] 
> Checkout utilizes the exact same driver infrastructure as its underlying core. For a deeper dive into how these drivers work under the hood, check out the [Orchestration Drivers](../orchestration/drivers) documentation.

## Adding a Provider

Payavel Checkout is designed to be completely provider-agnostic. You determine exactly which payment gateways (like Stripe, Adyen, Braintree, or your own bespoke solution) interface with your application.

To quickly scaffold a new payment provider integration, you may use the provider generation command:

```bash
php artisan checkout:provider
```

Similarly to the installation command, the interactive console will guide you through the process, prompting you for the provider's details before automatically generating the corresponding Gateway and Response classes necessary to start communicating with your new provider.

## Managing Configuration

After you run the installation command, a `checkout.php` configuration file will be published to your application's `config` directory. 

This file acts as the central hub for your payment setup. Here are some of the key things you can configure:

- **Defaults**: Define the default `driver`, `provider`, and `account`. If you avoid explicitly stating which provider or account to use while writing your code, Checkout will seamlessly fall back to these defaults.
- **Providers & Accounts**: If you chose the **Config** driver, this is where you will statically map your gateway classes and set your API keys/secrets for each merchant account.
- **Test Mode**: You can easily toggle `test_mode` (via the `CHECKOUT_TEST_MODE` `.env` variable). When enabled, Checkout will route your requests through a `FakeCheckoutRequest` class instead of hitting a live API—perfect for local development or pipelines lacking sandbox credentials.
- **Custom Models**: You can completely override Checkout's core Eloquent models (such as `Payment`, `Refund`, `Wallet`, `PaymentInstrument`, etc.) by pointing them to your own application's custom models.
