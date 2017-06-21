'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('438965853:AAGwB7Y5g8KqM3OVjkQilBuOrvCh8s9ZqmM',{workers: 1});
var ship = [
	'http://i.imgur.com/b7bzy0C.png',
	'http://i.imgur.com/hse69ui.jpg',
	'http://i.imgur.com/pyjpvhM.gif',
	'http://i.imgur.com/66j50Xz.jpg',
	'http://i.imgur.com/tCiQSlg.jpg',
	'http://i.imgur.com/DDLLoL8.gif',
	'http://i.imgur.com/LDzcDY3.jpg',
	'http://i.imgur.com/nkeMpLe.jpg',
	'http://i.imgur.com/ACaARFw.jpg',
	'http://i.imgur.com/aJkhUrE.jpg',
	'http://i.imgur.com/YBdJsaS.jpg',
	'http://i.imgur.com/KmZrtgd.jpg',
	'http://i.imgur.com/rmgCY2Q.jpg',
	'http://i.imgur.com/g00lVs9.gif',
	'http://i.imgur.com/LIIXWmD.png',
	'http://i.imgur.com/c6K9rP3.jpg',
	'http://i.imgur.com/2M8iyPt.jpg',
	'http://i.imgur.com/7XxnrTu.jpg',
	'http://i.imgur.com/AJN04yl.jpg',
	'http://i.imgur.com/rcIMpM0.gif',
	'http://i.imgur.com/60u8kye.jpg',
	'http://i.imgur.com/yUypmaC.jpg',
	'http://i.imgur.com/IflZleY.jpg',
	'http://i.imgur.com/h3mlvCq.png',
	'http://i.imgur.com/dXzZETc.png',
	'https://media.giphy.com/media/143vPc6b08locw/giphy.gif',
	'https://media0.giphy.com/media/14tFXhhNurdGp2/giphy.gif',
	'https://media4.giphy.com/media/ta83CqOoRwfwQ/giphy.gif',
	'https://media2.giphy.com/media/tDafHUBVrRKtq/giphy.gif',
	'https://media2.giphy.com/media/tDafHUBVrRKtq/giphy.gif',
]
var doit = [
	'http://i.imgur.com/RPbK0fZ.png',
	'http://i.imgur.com/TgUQfNI.jpg',
	'http://i.imgur.com/WSm116p.jpg',
]

class shipController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    
    shipHandler($) {
        $.sendMessage(ship[Math.floor(Math.random()*ship.length)])
    }


    get routes() {
        return {
            'shipCommand': 'shipHandler'
        }
    }
}

class doController extends TelegramBaseController {
	doHandler($) {
		$.sendMessage(doit[Math.floor(Math.random()*doit.length)])
	}

	get routes(){
		return{
			'doCommand': 'doHandler'
		}
	}
}

tg.router
    .when(
        new TextCommand('/shipit', 'shipCommand'),
        new shipController()
    )
	.when(
		new TextCommand('/doit','doCommand'),
		new doController()
	)
