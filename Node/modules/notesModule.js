var _ = require("underscore");
var mongojs = require('mongojs');
var db = mongojs('test', ['notesCol']);

function renderPage(request, response) {
	response.render("notes/notes");
}

var initial;
function notes_io(socket, io) {
	// socket.on('connection', function (socket) {

		socket.on('connected', function (data) {
			// var notes_socket_io = this;
			db.notesCol.find(function(err, data) {
				socket.emit('previousNotes', data)
				socket.broadcast.emit('previousNotes', data)
			})
		})
				

		socket.on('createNote', function (data) {
			this.broadcast.emit('onNoteCreated', data)
			db.notesCol.save(data, function(err, saved) {
			  if( err || !saved ) console.log("sentence not saved in db");
			  else console.log("saved in db");
			});
		});

		socket.on('updateNote', function (data) {
			this.broadcast.emit('onNoteUpdated', data)
			console.log(data)
			db.notesCol.findAndModify({
				query: {id: data.id},
				update: {id: data.id, title: data.title, body: data.body, x: data.x, y: data.y},
				new: true
			})
		});

		socket.on('deleteNote', function (data) {
			this.broadcast.emit('onNoteDeleted', data)
			db.notesCol.remove({id: data.id})
		})

		socket.on('moveNote', function (data) {
			console.log(data)
			db.notesCol.findAndModify({
				query: {id: data.id},
				update: {id: data.id, title: data.title, body: data.body, x: data.x, y: data.y},
				new: true
			})
			this.broadcast.emit('onNoteMoved', data)
		})

	// })
}
exports.notes_io = notes_io;
exports.renderPage = renderPage;

