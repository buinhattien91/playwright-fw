#//src/test/fce/features/simple.feature
Feature: Simple feature test on FCE project

  Scenario: Total amount with discount
    Given I buy 2 books
    And Each book cost 10000 vnd
    And I have a coupon 200 'vnd'
    Then Total amount should be equal 19800 vnd

  Scenario: Total amount without discount
    Given I buy 2 books
    And Each book cost 10000 vnd
    Then Total amount should be equal 20000 vnd

  # Scenario: Navigate to page
  #   Given User navigates to page "https://www.google.com"
