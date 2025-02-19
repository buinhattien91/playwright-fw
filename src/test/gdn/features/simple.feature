#//src/test/gdn/features/simple.feature 
Feature: Simple math using calculator

  Scenario: Calculate total amount
    Given I buy 5 pens
    And Each pen cost 10000 vnd
    And I have a coupon 10 '%'
    Then Total amount should be equal 45000 vnd

  # Scenario: Navigate to page
  #   Given User navigates to page "https://www.google.com"
