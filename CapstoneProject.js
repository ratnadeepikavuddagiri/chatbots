var TelegramBot = require('node-telegram-bot-api');
var request = require("request")
var apikey = "1169950594:AAFtbXfRU4jpvSPXnPcikebnvCeM5jM0ldg"

var bot = new TelegramBot(apikey, {polling: true});
bot.on('message',(msg) => {
	var d =msg.text;
	if(d=="Hi"){
		bot.sendMessage(msg.chat.id,"Hello!! user I am a bot on latest updates of corona virus.How can I help U?")
		bot.sendMessage(msg.chat.id,"Enter statecode,data wanted(active/confirmed/deaths/recovered/statenotes) to know the latest updates on coronavirus")
	}
	else{
		request('https://api.covid19india.org/data.json',function(err,response,body){
			if(err){
				bot.sendMessage(msg.chat.id,"Something went wrong!!.Please contact the administrator")
			
			}
			else{
				var data =d.split(",")
				var stcode =data[0]
				var wanted = data[1]
				console.log(stcode)
				console.log(wanted)
				for(var i=0;i<JSON.parse(body).statewise.length;i++){
					if(stcode == JSON.parse(body).statewise[i].statecode){
						if(wanted=="active")
							bot.sendMessage(msg.chat.id,"No .of cases that are active in "+ stcode + " : "+JSON.parse(body).statewise[i].active)
						else if(wanted =="confirmed")
							bot.sendMessage(msg.chat.id,"No . of patients tested positive in "+ stcode +" : "+JSON.parse(body).statewise[i].confirmed)
						else if(wanted =="deaths")
							bot.sendMessage(msg.chat.id,"No . of deaths in "+ stcode + " : "+ JSON.parse(body).statewise[i].deaths)
						else if(wanted =="recovered")
							bot.sendMessage(msg.chat.id,"No . of recovered patients in "+ stcode +" : "+JSON.parse(body).statewise[i].recovered)
						else if(wanted =="statenotes")
							bot.sendMessage(msg.chat.id,JSON.parse(body).statewise[i].statenotes)
						
						break;
					}
				}
			
			
			}
		})
	}

})