var socket = io(); 
$(document).ready(function(){
	
  var preloadbg = document.createElement("img");
  preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";
  var chatMsg = document.getElementById("chat-messages");
   
  socket.on('chat message', function(result){
    $('#chat-messages').append($('<div class="message"><div class="bubble"><div id="user">'+result.from+"</div>"+result.msg+'<div class="corner"></div></div></div>'));
    chatMsg.scrollTop = chatMsg.scrollHeight;
  });

  $("#chat-messages").addClass("animate");
				$('.cx, .cy').addClass('s1');
				setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
				setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);	
    chatMsg.scrollTop = chatMsg.scrollHeight;
    
	$("#sendmessage input").focus(function(){
		if($(this).val() == "Send message..."){
			$(this).val("");
		}
	});
	$("#sendmessage input").focusout(function(){
		if($(this).val() == ""){
			$(this).val("Send message...");
			
		}
	});
		
});