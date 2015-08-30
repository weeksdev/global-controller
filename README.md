# global-controller
A simple small js library for creating global event handling for your rich internet applications

##YAJL, Yet another javascript library!? Why?
I was sick of reregistering event listeners every time I recreated or destroyed a dom element.  What if I could just declare the #id->click event listener once.  This simple small library makes that possible.  Additionally, you may have a need for hash routes in your application those are also covered with this library in your controller.

##How do i use this?
firstly you can use bower to install global-controller:
`bower install bower install https://github.com/weeksdev/global-controller.git`

Or use git to clone this library locally.

then add references to the following scripts in your `index.html`:
```
<script src="path/to/jquery.min.js"></script>
<script src="path/to/signals.min.js"></script>
<script src="path/to/hasher.min.js"></script>
<script src="path/to/crossroads.min.js"></script>
<script src="path/to/global-controller.js"></script>
```

You need to create a new controller similar to the following example:
```
var mainController = new Controller('App', {
    init: function () {
        //setup event listeners
        this.listeners = {
            '[data-id="some-id"]': {
                click: this.doSomething
            },
            '#another-id':{
                click: this.doSomethingElse
            }
        }
        //set up hash maps (ie `http://www.mywebsite.com/#!Home`)
        this.hashes = {
            'Home': this.gotoHomePage,
            'Order/{id}': this.gotoOrder
        };
    },
    doSomething: function(){
      //do something
    },
    doSomethingElse: function(){
      //do something else
    },
    gotoHomePage: function(){
      //goto the home page
    },
    gotoOrder: function(id){
      //goto some specific order
    }
});
```