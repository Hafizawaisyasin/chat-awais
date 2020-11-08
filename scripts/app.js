//file like glue attatch everything

//dom quries
const chatList = document.querySelector(".chat-list");
const newchatform = document.querySelector(".new-chat");
const new_name_form = document.querySelector(".new-name");
const update_message = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

//add a new chat
newchatform.addEventListener("submit", (e) => {
	e.preventDefault();
	const message = newchatform.message.value.trim();
	//this is async fun or this return a promise
	chatroom
		.AddChat(message)
		.then(() => {
			newchatform.reset();
		})
		.catch((err) => console.log(err));
});

//update username

new_name_form.addEventListener("submit", (e) => {
	e.preventDefault();
	//update name via chatroom class
	const new_name = new_name_form.name.value.trim();
	chatroom.updatename(new_name);
	//reset the form
	new_name_form.reset();

	// show then hide the update message
	update_message.innerText = `Your name was updated to : ${new_name}`;
	setTimeout(() => (update_message.innerText = ""), 3000);
});
//updae chatroom
rooms.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON") {
		chatui.clear();
		chatroom.updateRoom(e.target.getAttribute("id"));
		chatroom.getChats((chat) => chatui.render(chat));
	}
});

//check local storage for name
const username = localStorage.username ? localStorage.username : "unknown";

//class instances
const chatui = new ChatUi(chatList);
const chatroom = new ChatRoom("gaming", username);

//now get chat and render to the dom
chatroom.getChats((data) => {
	return chatui.render(data);
});
