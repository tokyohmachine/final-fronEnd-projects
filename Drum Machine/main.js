$(document).ready(function() {
  var buttons = $('.drum-pad');
  var musicTitle = $('.music-title');
  var volumeInput = $('.volume');
  var switchButton = $('.switch.power');
  var isActive = true;

  buttons.click(function() {
    if (isActive) {
      var audio = $(this).find('.clip')[0];
      var audioTitle = $(this).find('.clip').attr('id');

      if (audio) {
        audio.currentTime = 0;
        audio.volume = volumeInput.val() / 100;
        audio.play();

        $('.title').hide();
        musicTitle.find('.' + audioTitle).show();
      }
    }
  });

  // update the text volume inside the music-title
  volumeInput.on('change', function() {
    $('.title').hide();
    var volumeValue = Math.round($(this).val());
    musicTitle.find('#volumeValue').text('Volume: ' + volumeValue).show();
    
    var audio = $(this).find('.clip')[0];
    if (audio) {
      audio.volume = volumeValue / 100;
    } 

    $('.drum-pad').on('click', function() {
      $('#volumeValue').hide()
    })

  });

  // when i switch the button to OFF then everything will be disabled
  switchButton.click(function() {
    
    if(!isActive) {
      $('this').addClass('active');
      $('this').parent('.switch.power').find('.drum-pad, .volume').removeAttr('disabled');
    } else {
      $(this).removeClass('active');
      $(this).parent('.switch.power').find('.drum-pad, .volume').attr('disabled', 'disabled');
      musicTitle.find('p').hide();
    }
  });
});
