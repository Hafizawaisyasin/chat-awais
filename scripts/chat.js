//adding new chat documents

//setting up a real-time listener to get new chats

//updating username

//updating the room

class ChatRoom {
	constructor(room, username) {
		this.room = room;
		this.username = username;
		this.chats = db.collection("chats");
		this.unsub;
	}
	//adding new chat documents
	async AddChat(message) {
		//format of a chat object
		const now = new Date();
		const chat = {
			message,
			username: this.username,
			room: this.room,
			created_at: firebase.firestore.Timestamp.fromDate(now),
		};
		//save chat document

		const response = await this.chats.add(chat);
		return response;
	}

	//setting up a real-time listener to get new chats
	getChats(callback) {
		this.unsub = this.chats
			.where("room", "==", this.room)
			.orderBy("created_at")
			.onSnapshot((snap) => {
				snap.docChanges().forEach((change) => {
					if (change.type === "added") {
						//update the ui

						callback(change.doc.data());
					}
				});
			});
	}

	//updating username
	updatename(username) {
		this.username = username;
		localStorage.setItem("username", username);
	}
	//update room
	updateRoom(room) {
		this.room = room;
		console.log("room updated");
		if (this.unsub) {
			this.unsub();
		}
	}
}

//this content move to app file
// const chatroom = new ChatRoom("general", "miral");
// chatroom.getChats((data) => {
// 	return console.log(data);
// });

// .AddChat("hello all")
// .then(() => {
// 	console.log("chat added");
// })
// .catch((err) => {
// 	console.log(err);
// });

//deleted

// setTimeout(() => {
// 	chatroom.updateRoom("music");
// 	chatroom.updatename("ali");
// 	chatroom.getChats((data) => {
// 		console.log(data);
// 	});
// 	chatroom.AddChat("hello awaiasi");
// }, 3000);
