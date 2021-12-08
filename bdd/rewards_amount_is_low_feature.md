Scenario 3: rewards amount lower than transaction cost

Given transaction has a cost  
And delegator has a reward  
And Olivia has specified a **minimum accepted reward value for payout**  
When delegator's reward is lower than **minimum accepted reward value**  
Then delegators that don't meet requirements are **disabled for payout**   
And disabled delegators will be left out of the **built batch** transaction  
