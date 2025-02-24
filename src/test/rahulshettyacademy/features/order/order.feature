Feature: Order & payment

  Scenario: Update items & price when Add to cart
    Given User navigates to page "https://rahulshettyacademy.com/seleniumPractise/#/"
    When User clicks on Your cart icon
    Then User should see empty your cart

  Scenario: Update items & price when Add to cart
    Given User navigates to page "https://rahulshettyacademy.com/seleniumPractise/#/"
    When User clicks on Add to cart button on "Brocolli - 1 Kg" product
    Then User should see added this product's items & price