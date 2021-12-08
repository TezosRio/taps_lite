Scenario 1: rewards distribution

Given delegators rewards list is **loaded**  
And Olivia has **customized delegators fees**  
And Olivia has **defined individual payouts**  
And TAPS **status** is ON  
When she asks to distribute rewards  
Then **batch transaction** is built  
And **batch transaction** is sent to Beacon wallet  

