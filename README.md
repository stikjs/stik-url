#stik-url-state

##$urlState
`$urlState` will help you answer questions about the current state of your url.

###Using it
```javascript
stik.controller("YourCtrl", "YourAction", function($urlState){
  // http://my-website.com?someKey=someValue
  $urlState.$queries(); // {someKey: "someValue"}

  // http://my-website.com#users
  $urlState.$hash(); // "users"
  $urlState.$hash("products");
  // http://my-website.com#products
});
```

Available methods:

* $queries
* $hash
