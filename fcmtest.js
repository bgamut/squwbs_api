var serverKey = 'AAAAXjswxbg:APA91bEpU8908It6G_CrMx8W5DpY2MBK5G3k0VNoJw0Aku-o43HjFnc36F_SB9cT3TrHXOA4gztiJ8xgF6lukf8EHbSdYUe3DUNjOmWd-QHZL6GTrtETkRs2Rh-69rphLlFDUdb5VqEa';
var MOBILE_FCM = require('fcm-push');
var mobile_fcm = new MOBILE_FCM(serverKey);
//var DESKTOP_FCM = require('push-fcm')
//var desktop_fcm = new DESKTOP_FCM(serverKey);
var message = {
    //mobile https://appspot
    //to: 'f6fAujFFP6b3Ez8g6avNgj:APA91bGNCGGF3XFdJjpIvg0d0kIjGgTbRZmXu_1p4Vd4whQGZpJkvh3y2DyET3DWxXejzCQ8lR8rg0KD0DwL8ID8ia9onq', // required fill with device token or topics
    //localhost:3000
    to:"d2wvC5FmRbZd87v1xJHcfv:APA91bGTdYBmRD0xMCrz4IlMKpMkKjcMBcVYhMNojqu0wjr42JjzZDTndu_3s0D40oyjvhVDxQ8hlLXntAZ5EsTcVk2xg7Aw1zuTOaAX4kXcPWjZ713jGin0-F5oiDpn7pD4OAu_TMxJ",
    //appspot
    //to:"dr6dAU9_A1A:APA91bGjOybsSP2A3tEChuBhzql_9ZsW4OLvJ_zxkaZrjj_CEpr",
    collapse_key: 'do_not_collapse', 
    data: {
        your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
    }
};

//callback style
mobile_fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});
// desktop_fcm.send(message, function(err, response){
//     if (err) {
//         console.log("Something has gone wrong!");
//     } else {
//         console.log("Successfully sent with response: ", response);
//     }
// });