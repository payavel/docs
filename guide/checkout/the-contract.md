# The Checkout Contract

Every Checkout integration you develop must adhere to the underlying `CheckoutRequester` contract. This ensures complete uniformity across your gateways, saving you from writing conditional application logic everywhere.

If you generated your provider via the `php artisan checkout:provider` command, these methods are automatically stubbed out for you. 

Here are the primary requests each provider is expected to handle:

## Payment Instruments
In today's e-commerce landscape, correctly storing and retrieving customer payment methods is paramount.

- `getWallet(Wallet $wallet)`: Fetch the details of a customer's entire wallet.
- `getPaymentInstrument(PaymentInstrument $paymentInstrument)`: Retrieve a specific saved instrument's details.
- `tokenizePaymentInstrument(Billable $billable, $data)`: Tokenize and store a new payment method safely within the provider.
- `updatePaymentInstrument(PaymentInstrument $paymentInstrument, $data)`: Update an existing tokenized method (e.g., updating an expiry date).
- `deletePaymentInstrument(PaymentInstrument $paymentInstrument)`: Remove a permanently saved instrument from the gateway.

## Transactions
The core lifecycle of moving money seamlessly. 

- `authorize($data, Billable $billable = null)`: Request a hold on the customer's funds.
- `capture(Payment $payment, $data = [])`: Capture the previously authorized hold and properly settle the transaction.
- `void(Payment $payment, $data = [])`: Cancel a pending authorization before it's captured to release the funds.
- `refund(Payment $payment, $data = [])`: Refund a partially or fully captured payment securely.
- `getTransaction(Payment $transaction)`: Retrieve the latest status and details of an ongoing or completed transaction.

> [!NOTE]
> Regardless of which provider executed the request, **every single one of these methods returns a unified `CheckoutResponse` object** containing data standardized to your liking. This means you handle Adyen's and Stripe's responses in the exact same pristine format.

## Editing the Contract

Does your application require a hyper-specific edge case or proprietary feature that isn't inherently covered by Checkout's base interface? Or perhaps you want to *remove* methods that your application simply has no use for? No problem!

During installation, a local `App\Services\Checkout\Contracts\CheckoutRequester` interface is generated within your application that extends Payavel's base setup. 

You can simply add any new method signatures directly to this local interface to stretch your capabilities. Alternatively, if you want to drastically simplify the contract, you can stop inheriting from the base `Payavel\Checkout\Contracts\CheckoutRequester` entirely, and simply manually define the exact methods that matter to you.

### Updating Provider Stubs

To ensure your development experience remains perfectly automated after editing your contract, you can update the stubs that power Checkout's provider scaffolding.

First, publish the Checkout stubs to your application:

```bash
php artisan checkout:stubs
```

Once published, you will see a `checkout-request.stub` inside your `stubs` directory. You can update this file so that it perfectly aligns with your newly edited local contract. By doing so, you won't ever need to manually type those methods out again; every new payment provider you scaffold using `php artisan checkout:provider` moving forward will effortlessly generate with your modifications already included!
