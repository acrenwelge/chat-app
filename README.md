## Chat App

This is a group chat application where users can broadcast messages to everyone
in their group.

### Tech
* Backend
  * Node.js
  * Express.js
  * Socket.io
* Frontend
  * React

### Features
* Group chat (messages broadcast to everyone)
* Broadcast a message to connected users when someone connects or disconnects.
* Add “{user} is typing” functionality.
  * Starts when user types 1+ characters
  * Notification is removed if chat input box is emptied
* Show who’s online (active users)

### Future to-do
* Add support for nicknames.
* Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
* Add private messaging.
