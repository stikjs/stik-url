#stik-url

##$url
`$url` will help you interact with your url.

###Using it
```javascript
stik.controller("YourCtrl", "YourAction", function($url){
  // http://my-website.com?someKey=someValue
  $url.queries(); // { someKey: "someValue" }

  // http://my-website.com#users
  $url.hash(); // "users"
  $url.hash("products");
  // http://my-website.com#products
});
```

Available methods:

* baseUrl
* relativeUrl
* pathName
* hash
* locationHash
* mainPath
* queries
