$(document).ready(function(){
  
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    questions: {
      q1: 'Who is Rob Zombies guitarist?',
      q2: 'What is Marilyn Mansons real name?',
      q3: 'Wu tang clan?',
      q4: 'Who wrote Purple Rain?',
      q5: "Michael Jackson wrote?",
      q6: 'Corey Taylor is from?',
      q7: "Nirvana's lead singer was?"
    },
    options: {
      q1: ['John 5', 'Stephen King', 'Brian Cranston', 'Slash'],
      q2: ['Brian Warner', 'Blake Templeton', 'Ricky Scuderi', 'Sammy Sosa'],
      q3: ['Aint nothin to mess with', 'Wu-Tang!', 'What?', 'Wu who?'],
      q4: ['The Kool-Aid man', 'Prince', 'Alice Cooper', 'Sinatra'],
      q5: ['Bohemian Rhapsody','Star Spangled Banner','Thriller','Silent Night'],
      q6: ['Slipknot','Meshuga','Slayer','Pantera'],
      q7: ['Kurt Cobain', 'Prince', 'Dave Grohl','Tony Hawk']
    },
    answers: {
      q1: 'John 5',
      q2: 'Brian Warner',
      q3: 'Aint nothin to mess with',
      q4: 'Prince',
      q5: 'Thriller',
      q6: 'Slipknot',
      q7: 'Kurt Cobain'
    },
    
    startGame: function(){
   
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      
      $('#results').html('');

      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },
 
    nextQuestion : function(){
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
 
    timerRunning : function(){

      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>It was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
  
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')
          .html('<h3>Nice job!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Try again?</p>');

        $('#game').hide();
        $('#start').show();
      }
      
    },

    guessChecker : function() {
      
    
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

      if($(this).text() === currentAnswer){
   
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Nice!</h3>');
      }
     
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Wrong! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      
      trivia.currentSet++;
 
      $('.option').remove();
      $('#results h3').remove();
    
      trivia.nextQuestion();
       
    }
  
  }