$(document).ready(function() {
    var musicTitle = $('.music-title');
    var volumeInput = $('.volume');
    var powerActive = $(this).prev('input[type="checkbox"]').prop('checked');
    var isActive = true;
    powerActive = isActive;
    
    // Event handler for the switch slider
    $('.switch.power .slider').on('click', function() {
      isActive = !isActive;
      updateFunctionality();
      
    });
  
    function updateFunctionality() {
      if (!isActive) {
        $('.switch.power input[type="checkbox"]').prop('checked', false);
        disableButtons();
      } else {
        $('.switch.power input[type="checkbox"]').prop('checked', true);
        enableButtons();
      }
    }
  
  // Enable functionality event handler for drum-pad buttons
  function enableButtons() {
    $('.drum-pad').on('click', function() {
      var audio = $(this).find('.clip')[0];
      var audioTitle = $(this).find('.clip').attr('id');
      
  
      if (audio) {
        audio.currentTime = 0;
        audio.volume = volumeInput.val() / 100;
        audio.play();
  
        $('.title').hide();
        musicTitle.find('.' + audioTitle).show();
        
      }
  
      volumeInput.on('change', function() {
        var volumeValue = Math.round($(this).val());
  
        if (isActive) {
          $('.title').hide();
          musicTitle.find('#volumeValue').text('Volume: ' + volumeValue).show();
  
          var audio = $('.drum-pad').find('.clip')[0];
          if (audio) {
            audio.volume = volumeValue / 100;
          }
        }
      });
  
      $('.drum-pad').on('click', function() {
        $('#volumeValue').hide();
      });
      
  
  
    });
  }
    
  // disabled functionality
  
  function disableButtons() {
    $('.drum-pad').off('click');
    $('.title').hide();
    $('#volumeValue').hide();
    
  }
  
  $(document).on('keydown', function(event) {
    if (isActive) {
      var key = event.key.toUpperCase();
      //  find a .drum-pad element whose text content 
      //(innerText) contains the specific character/key pressed
      var button = $('.drum-pad:contains("' + key + '")');
      
      if (button.length > 0) {
        button.trigger('click');
      }
    }
  
    
  });
  
  // Initial update based on isActive state
  updateFunctionality();
  });
  
