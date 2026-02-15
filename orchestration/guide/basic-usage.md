# Basic Usage
Getting started with Orchestration in your Laravel application is straightforward. This guide will walk you through the process of setting up a basic service, making your first service request, and handling the response. For this example, we'll use a hypothetical checkout service integration.

## Step 1: Orchestrate the Service
The first step is to define a service. If you haven't done so yet, follow the [installation guide](/orchestration/guide/installation) to set up a 'checkout' service along with a provider and an account.
```bash
php artisan orchestrate:service
```

Then, configure your service accordingly by following our [configuration guide](/orchestration/guide/configuration).
```php
return [

    'defaults' => [
        'provider' => 'stripe',
        'account' => 'payavel',
    ],

    'providers' => [
        'stripe' => [
            'gateway' => \App\Services\Checkout\StripeCheckoutRequest::class,
            'base_url' => 'https://api.stripe.com', // [!code ++]
        ],
    ],

    'accounts' => [
        'payavel' => [
            'providers' => [
                'stripe' => [
                    'api_key' => env('STRIPE_PAYAVEL_API_KEY'),
                    'account_id' => env('STRIPE_PAYAVEL_ACCOUNT_ID'),
                ],
            ],
        ],
    ],

];
```

## Step 2: Prepare the Gateway
Now let's establish the gateway for your service, which acts as the bridge between your application and the service provider. The gateway encapsulates all the necessary logic for communicating with the provider's API, including setting up HTTP requests, handling authentication, and defining the base URL.

```php
namespace App\Services\Checkout;

use App\Services\Checkout\Contracts\CheckoutRequester;
use Illuminate\Support\Facades\Config; // [!code ++]
use Illuminate\Support\Facades\Http; // [!code ++]
use Payavel\Orchestration\ServiceRequest;

class StripeCheckoutRequest extends ServiceRequest implements CheckoutRequester
{
    private $http; // [!code ++]

    protected function setUp(): void
    {
        // // [!code --]
        $this->http = Http::asForm() // [!code ++:9]
            ->baseUrl(Config::get('checkout.providers.stripe.base_url'))
            ->withToken(
                Config::get("checkout.accounts.{$this->account->getId()}.providers.stripe.api_key")
            )
            ->withHeader(
                'Stripe-Account',
                Config::get("checkout.accounts.{$this->account->getId()}.providers.stripe.account_id")
            );
    }
}
```

This setup process not only encapsulates the configuration necessary for the specific service provider but also illustrates how orchestration's flexible architecture allows for easy adaptation to different service requirements.

## Step 3: Define the Service Contracts
Before implementing the logic of your service, start by defining the contracts for both requests and responses. These contracts serve as blueprints for how your service interacts with various providers.

### Request Contract
Update the "app/Services/Checkout/Contracts/CheckoutRequester" interface with actions the service should perform.

```php
namespace App\Services\Checkout\Contracts;

interface CheckoutRequester
{
    // // [!code --]
    public function charge(array $data): CheckoutResponder; // [!code ++]
}
```

### Response Contract
Similarly, update the "app/Services/Checkout/Contracts/CheckoutResponder" interface. This ensures that your service returns a consistent response structure, regardless of the underlying provider.

```php
namespace App\Services\Checkout\Contracts;

interface CheckoutResponder
{
    // // [!code --]
    public function chargeResponse(): array; // [!code ++]
}
```

## Step 4: Implement the Contracts
After defining the service contracts, we shall implement them with actual logic that interacts with your service provider. This involves creating classes that fulfill the defined interfaces, enabling your service to perform actions and return structured responses.

The following implementations illustrate how orchestration facilitates the integration of complex service interactions into your Laravel application, abstracting away the direct API calls and responses into a more manageable and consistent format.

### Service Request Implementation
```php
namespace App\Services\Checkout;

use App\Services\Checkout\Contracts\CheckoutRequester;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Payavel\Orchestration\ServiceRequest;

class StripeCheckoutRequest extends ServiceRequest implements CheckoutRequester
{
    private $http;

    protected function setUp(): void
    {
        $this->http = Http::asForm()
            ->baseUrl(Config::get('checkout.providers.stripe.base_url'))
            ->withToken(
                Config::get("checkout.accounts.{$this->account->getId()}.providers.stripe.api_key")
            )
            ->withHeader(
                'Stripe-Account',
                Config::get("checkout.accounts.{$this->account->getId()}.providers.stripe.account_id")
            );
    }
    // [!code ++:16]
    public function charge(array $data): StripeCheckoutResponse
    {
        $response = $this->http->post('v1/payment_intents', [
            'amount' => $data['amount'],
            'currency' => $data['currency'] ?? 'usd',
            'payment_method' => $data['paymentMethod']['nonce'],
            'confirm' => 'true',
            'automatic_payment_methods' => [
                'enabled' => 'true',
                'allow_redirects' => 'never',
            ],
        ]);

        return new StripeCheckoutResponse($response);
    }
}
```

### Service Response Implementation
```php
namespace App\Services\Checkout;

use App\Services\Checkout\Contracts\CheckoutResponder;
use Payavel\Orchestration\ServiceResponse;

class StripeCheckoutResponse extends ServiceResponse implements CheckoutResponder
{
    protected $successStatuses = [200]; // [!code ++]

    private $decodedResponse; // [!code ++]

    /**
     * Set up the response.
     *
     * @return void
     */
    protected function setUp()
    {
        //  // [!code --]
        $this->decodedResponse = json_decode($this->rawResponse, true); // [!code ++]
    }

    /**
     * Determines the status code based on the request's raw response.
     *
     * @return int
     */
    public function getStatusCode()
    {
        //  // [!code --]
        return $this->rawResponse->getStatusCode(); // [!code ++]
    }

    /**
     * Get a string representation of the response's status.
     *
     * @return string|null
     */
    public function getStatusMessage()
    {
        //  // [!code --]
        return $this->isSuccessful() // [!code ++:3]
            ? 'Success'
            : 'Error';
    }

    /**
     * Get a description of the response's status.
     *
     * @return string|null
     */
    public function getStatusDescription()
    {
        //  // [!code --]
        return $this->isSuccessful() // [!code ++:3]
            ? 'The request was successful.'
            : 'Something went wrong.';
    }

    public function chargeResponse(): array // [!code ++:7]
    {
        return [
            'reference' => $this->decodedResponse['id'],
            'amount' => $this->decodedResponse['amount'],
        ];
    }
}
```

## Step 5: Use the Service
Now that you have your service and its contracts implemented, it's time to put everything into action. This step demonstrates how to use the orchestrated service within a single action controller to process a checkout action based on a customer's cart.

```php
namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Payavel\Orchestration\Service;

class CheckoutController extends Controller
{
    private $checkout;

    public function __construct()
    {
        $this->checkout = new Service('checkout');
    }

    public function __invoke(Request $request, Cart $cart)
    {
        $request->validate([
            'paymentMethod.nonce' => ['required', 'string', 'max:255'],
        ]);

        $response = $this->checkout->charge([
            'amount' => $cart->getTotal(),
            'paymentMethod' => [
                'nonce' => $request->input('paymentMethod.nonce'),
            ],
        ]);

        if ($response->isNotSuccessful()) {
            return response()->json([
                'code' => $response->statusCode,
                'message' => $response->statusMessage,
            ])->setStatusCode(424);
        }

        $order = Order::createFromCheckout($cart, $response);

        return response()->json($order)->setStatusCode(201);
    }
}
```
```php
// routes/api.php
Route::post('carts/{cart}/checkout', CheckoutController::class)->name('carts.checkout');
```

## Next Steps
By following this guide, you've learned how to orchestrate a service, define and implement service contracts, and effectively use the orchestrated service in a real-world scenario.

Ready to dive deeper? Consider exploring more sophisticated features of orchestration, including  advanced service mocking strategies, and dynamic service configuration based on runtime conditions.
