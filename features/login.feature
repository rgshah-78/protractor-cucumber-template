Feature: Login page
    As a user
    I should be able to perform action on login page

    Scenario: Error message should be display for invalid user and password
      Given I have opened base url in browser
      And I have opened login page
      When I enter user as "wilson@email.com"
      And I enter password as "wilson1234567890"
      Then I should see error message as "Incorrect IBMid or password. Please try again!"


# Note we can write scenario outline for multiple test data