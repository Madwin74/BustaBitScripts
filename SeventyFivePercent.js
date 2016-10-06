//Send tips to 1HQ7seETwEeDWthPsSD6zUYoZVkE3oQW5 if you find this useful!
//USE AT YOUR OWN RISK

var defaultBet = 1;
var defaultCashout = 5;
var cashoutThreshold = 0.75;

// This strategy editor is in BETA mode, please
// exercise extreme caution and use exclusively at
// your own risk. No bets can or will be refunded in
// case of errors.

// Please note the strategy editor executes arbitrary
// javascript without a sandbox and as such, only use
// strategies from trusted sources, as they can be
// backdoored to lose all your money or have
// intentional exploitable weaknesses etc.



//Engine events: 

var _activeCount = 0;
var _totalCount = 0;
engine.on('game_starting', function(info) {
  if (!cashedOut){
	  return;
	}


    console.log('Game Starting in ' + info.time_till_start);
console.log('will bet ', defaultBet );
console.log('will cashout at ', defaultCashout );

engine.placeBet(defaultBet * 100, Math.round(defaultCashout * 100), false);

});

engine.on('game_started', function(data) {
    console.log('Game Started', _totalCount );
  
  

});

engine.on('game_crash', function(data) {
    console.log('Game crashed at ', data.game_crash);
  _totalCount = 0;
  _activeCount = 0;
	 cashedOut = false;
});

engine.on('player_bet', function(data) {
  _totalCount++;
  _activeCount++;
   // console.log('The player ', data.username, ' placed a bet. This player could be me :o.')
});

var cashedOut = true;
engine.on('cashed_out', function(resp) {
   _activeCount--;

   //console.log('Percentage left', _activeCount / _totalCount);
   if (!cashedOut && _activeCount / _totalCount < cashoutThreshold) {
     engine.cashOut();
     cashedOut = true;
   }

  

});

engine.on('msg', function(data) {
    //console.log('Chat message!...');
});

engine.on('connect', function() {
    console.log('Client connected, this wont happen when you run the script');
});

engine.on('disconnect', function() {
    console.log('Client disconnected');
});


//Getters:
console.log('Balance: ' + engine.getBalance());
console.log('The current payout is: ' + engine.getCurrentPayout());
console.log('My username is: ', engine.getUsername());
console.log('The max current bet is: ', engine.getMaxBet()/100, ' Bits');
console.log('The current maxWin is: ', engine.getMaxWin()/100, ' Bits');
// engine.getEngine() for raw engine 


//Helpers:
console.log('Was the last game played? ', engine.lastGamePlayed()?'Yes':'No');
console.log('Last game status: ', engine.lastGamePlay());


//Actions:
//Do this between the 'game_starting' and 'game_started' events
//engine.placeBet(betInSatoshis, autoCashOutinPercent, autoPlay);

//engine.cashOut(); //Do this when playing
//engine.stop(); //Stops the strategy
//engine.chat('Hello Spam');
