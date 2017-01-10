## Notification UI widget
A custom widget to enable notification.

### Calling notification 
```javascript
  $.fn.notificationWrapper({
    notificationType: "info",
    template: $("#noti-p-wrap").html(),
    width: "200px",
    height: 90,
    notificationPosition: "centerBottom",
    whereToAppend: $("body"),
    autoHide : false
  });
```
  
### Defaults Options
  
Options                           | Default Value                | Description                               
 --------------------------------- |-----------------------------| -----------------------------------------
 notificationType                  | `info || error`             | Can be shown for info or error            
 width                             | `400px`                     | Can be in % or in px                      
 height                            | `110px`                     | Default height                            
 notificationPosition              | `centerTop || centerBottom` | Only two options are there centerTop and centerBottm 
 autoHide                          | `true`                          | It will be hidden if its true in 3000ms   
 template                          | `A string or a html or a JS template`  |   `template: $("#noti-p-wrap").html(),  template: Mustache.to_html($("#noti-p-wrap").html(), {})`
 whereToAppend                     | `$(body)` |Default is body but it can be appended to any place  
 close                             | `true`    |Its a boolean and true to make it close on click can used   fase if not want to fire close event                                   
 backgroundColor                   | `rgba(42,45,50,0.85)`     |   Notification wrapper background color 
color                             | `rgba(250,251,255,0.95)`  |   Text color                              
opacity| `1` | It will change notification-center opacity 

  
