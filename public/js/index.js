var socket = io();
$(document).ready(function () {
    var chatMsg = document.getElementById("chat-messages");

    socket.on('chat message', function (result) {
        $('#chat-messages').append($('<div class="message">' +
            '<div class="bubble"><div id="user">' + result.from + "</div>" + result.msg + 
            '<div class="corner"></div></div></div>'));
        chatMsg.scrollTop = chatMsg.scrollHeight;
    });

    $("#chat-messages").addClass("animate");
    
    $('.cx, .cy').addClass('s1');
    
    setTimeout(function () {
        $('.cx, .cy').addClass('s2');
    }, 100);
    
    setTimeout(function () {
        $('.cx, .cy').addClass('s3');
    }, 200);
    
    chatMsg.scrollTop = chatMsg.scrollHeight;

    $("#sendmessage").find("input").focus(function () {
        if ($(this).val() == "Send message...") {
            $(this).val("");
        }
    });
    
    $("#sendmessage").find("input").focusout(function () {
        if ($(this).val() == "") {
            $(this).val("Send message...");
        }
    });
    
});