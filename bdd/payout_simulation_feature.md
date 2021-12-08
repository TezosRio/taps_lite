Scenario 6: payout simulation

Given **delegators rewards list** is loaded  
And Olivia has customized **delegators fees**  
And Olivia has defined **individual payouts**  
And TAPS **status** is OFF  
When she asks to distribute rewards  
Then **batch transaction** is built  
And **PDF file** is generated  
Then Olivia can check **rewards list, amounts and totals**  
