## Geometry Dash Modules - _Level Guide_
RhinoJS Geometry Dash Module
> **Note**: This module can be run on [Rhino](https://developer.mozilla.org/ko/docs/Rhino) and is unstable as it is a beta version.

### All Methods
```javascript
- ** GDClient **

- GDClient.searchLevel(@String name, @Number page, @GDFilter filter, @Number field) { Connection (Paginator) }
-
- GDClient.getLevel(@Number id) { Connection (GDLevel) }
-
- GDClient.likeLevel(@Number id, @Boolean like, @String customUuid) { Connection (String) }
-
- GDClient.reportLevel(@Number id) { Connection (String) }
```

### Example
```javascript
const scriptName = "example.js";
GDClient = require("plugins/gd/GDClient").GDClient;

var client = GDClient.build()
                    .timeout(300000)
                    .login(/*My Account ID*/, /*My Password*/);

//searching level
var levels = client.searchLevel("Dimension Breaker", 0, null);
levels = levels.block();

for(l in levels.items){
    Log.i(levels[l].toString());
}

//get leveldata by id
var level = client.getLevel(17711004); //Conical Depression's level id
level = level.block();

Log.i(level.toString());

//like level by id
var like = client.likeLevel(48591102, true); //Ancestral Calamity's level id

Log.i(like.block());

//reporting level by id
var report = client.reportLevel(27580467); //Hatred's level id

Log.i(report.block());