## Geometry Dash Modules - _Friend Guide_
RhinoJS Geometry Dash Module
> **Note**: This module can be run on [Rhino](https://developer.mozilla.org/ko/docs/Rhino) and is unstable as it is a beta version.

### All Methods
```javascript
- ** GDClient **

- GDClient.acceptFriendRequest(@Number accid, @Number reqid) { Connection (String) }
-
- GDClient.denyFriendRequest(@Number accid, @Number reqid) { Connection (String) }
-
- GDClient.loadFriendRequest(@Number page, @Boolean isSent) { Connection (String) }
```

### Example
```javascript
const scriptName = "example.js";
GDClient = require("plugins/gd/GDClient").GDClient;

var client = GDClient.build()
                    .timeout(300000)
                    .login(/*My Account ID*/, /*My Password*/);

var requests = client.loadFriendRequest(0, false);
requests = requests.block();

for(r in requests.items){
    Log.i(requests[r].toString());
}

var accept = client.acceptFriendRequest(
    requests.items[0].requestSenderAccId,
    requests.items[0].requestId
);

Log.i(accept.block());

var deny = client.denyFriendRequest(
    requests.items[1].requestSenderAccId,
    requests.items[1].requestId
);

Log.i(deny.block());
```
