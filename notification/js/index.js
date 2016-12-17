/**
 *    @author saorbah
 */
(function ($) {
  $.fn.notificationWrapper = function (config) {
    var clearNotificationInterval = null
        ,notificationCenter = $("#noti-center-wrap")
      ;
    var options = {
      notificationType: "info"
      ,width: 400
      ,height: 110
      ,notificationPosition: "centerTop"
      ,autoHide: true
      ,template: "Hello World"
      ,opacity: 1
      ,timeout: 3000
      ,whereToAppend: "body"
      ,close: true
      ,closeIocn: true
      ,centerTopPostion : ( window.innerWidth ||
                            document.documentElement.clientWidth ||
                            document.body.clientWidth )
                            / 2
      ,backgroundColor: "rgba(42,45,50,0.85)"
      ,color: "rgba(250,251,255,0.95)"
    };

    $.extend(options, config);

    //Building a default templte
    //Which will wrap the options.template
    var notificationTemplateWrapper = "<div id='notification-center'>" + options.template + "<div class='cancle-wrapper' rel='cancle-notification'><div class='close-icon'>&times;</div></div></div>";

    //Clear the interval
    clearInterval(clearNotificationInterval);

    //Remove if already available
    if ($(options.whereToAppend).find($("#notification-center")).length > 0) {
      notificationCenter.remove();
    }

    //Same as $("body").append(notification); Appending the message to body
    $(options.whereToAppend).append(notificationTemplateWrapper);

    //User can add extra class if he wants to add some extra styling
    if (options.extraClass !== "") {
      $("#notification-center").addClass(options.extraClass);
    }

    //Setting wrapper width and opac
    if (options.whereToAppend !== "body") {
      var width;
      width = $(options.whereToAppend).outerWidth();
    } else {
      width = options.width;
    }
    $("#notification-center").css({
      "width": width,
      "opacity": options.opacity,
      "height": options.height
    });

    switch (options.notificationType) {
      //Will add error class on wraper to make diffrent styling
      case "error":
        $("#notification-center").addClass("error");
        break;
        //Will add success class on wraper to make diffrent styling
      case "info":
        $("#notification-center").addClass("success");
        break;
    }

    //User defined background color and font colors
    $("#notification-center").css({
      "background-color": options.backgroundColor,
      "color": options.color
    });

    switch (options.notificationPosition) {
      //If user pass the center
      // as a postion respect to body/el

      case "centerTop":
        $("#notification-center").css({
          "top": parseInt(0 - (options.height)),
          "left": options.centerTopPostion - parseInt(options.width / 2)
        });
        $("#notification-center").animate({top: 0});
        break;
      case "centerBottom":
        $("#notification-center").css({
          "bottom": parseInt(0 - (options.height)),
          "left": options.centerTopPostion - parseInt(options.width / 2)
        });
        $("#notification-center").animate({bottom: 0});
    }

    if (options.close) {
      //If user passes close as true the notification block will close it self when user clicks on it.
      $("#notification-center").click(function () {
        NotificationData(clearNotificationInterval, options);
      });
    } else {
      //var userSayCancle = $("#notification-center").find("span").data("cancle-notification");
      //Support of Buttons
      // If any element have a ref which value is cancle-notification
      // will responsible to close the notification block
      $("[rel='cancle-notification']").click(function () {
        NotificationData(clearNotificationInterval, options);
      });
    }

    //If autohide option enabled
    if (options.autoHide) {
      if (!isNaN(options.timeout)) {
        //If auto hide is ture by user
        clearNotificationInterval = setTimeout(function () {
          $("#notification-center").trigger('click');
        }, options.timeout);
      }

    }
    $(options.whereToAppend).on('closeNotification', function () {
      NotificationData(clearNotificationInterval, options);
    });
  };
//Reset the notification
//Animation toawrds top to hide
  function NotificationData(clearNotificationInterval, config) {
    clearInterval(clearNotificationInterval);
    if (!config.fade) {
      switch (config.notificationPosition) {
        case "centerTop":
          $("#notification-center").animate({
            top: parseInt(config.height - (config.height / 2))
          }, 300, function () {
            $("#notification-center").animate({
              top: parseInt(0 - (config.height * 2))
            }, 300, function () {
              $("#notification-center").remove();
            });
          });
          break;
        case "centerBottom":
          $("#notification-center").animate({
            bottom: parseInt(config.height - (config.height / 2))
          }, 300, function () {
            $("#notification-center").animate({
              bottom: parseInt(0 - (config.height * 2))
            }, 300, function () {
              $("#notification-center").remove();
            });
          });
          break;
      }
    } else {
      $("#notification-center").fadeOut("slow", function () {
        $("#notification-center").remove();
      });
    }
  }
  $.fn.notificationWrapper({
    notificationType: "error",
    //Can be passed any template as well
    //template: Mustache.to_html($("#noti-p-wrap").html(), {}),
    template: $("#noti-p-wrap").html(),
    width: "200px",
    height: 90,
    notificationPosition: "centerBottom",
    whereToAppend: $("body"),
    autoHide : false
  });
})(jQuery);
