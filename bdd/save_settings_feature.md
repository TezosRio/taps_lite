Scenario 11: save settings  

Given Olivia has specified a **baking address**  
And she has set an **RPC provider**  
And she has set a **baker fee**  
And she has specified a **minimum accepted delegated amount**  
And she has set a **minimum transaction value**  
When she asks to save **settings**  
Then TAPS will store her **configuration**
And TAPS will fetch **delegators list** from Internet  
And TAPS will get **baker logo** from Internet  
And TAPS will get **baker name** from Internet  
