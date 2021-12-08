Scenario 2: delegated amount is lower then required for payout  

Given delegator has a **delegated amount**  
And Olivia has specified a **minimum accepted delegated amount**  
And delegator's **delegated amount** is lower than **minimum accepted**  
When **delegators list** is shown  
Then delegators that don't meet requirements are **disabled for payout**  
And disabled delegators will be left out of the **built batch** transaction  
