(function($) {

	$.extend(mejs.MepDefaults, {
		playpauseText: mejs.i18n.t('Play/Pause')
	});

	// PLAY/pause BUTTON
	$.extend(OnebuttonMediaElementPlayer.prototype, {
		buildplaypause: function(player, controls, media) {
			var 
				t = this,
				play = 
				$('<div class="mejs-button mejs-playpause-button mejs-play onebutton-loading" >' +
					'<button type="button" aria-controls="' + t.id + '" title="' + t.options.playpauseText + '" aria-label="' + t.options.playpauseText + '"></button>' +
				'</div>')
				.appendTo(controls)
				.click(function(e) {
					e.preventDefault();
				
					if (media.paused) {
						media.play();
					} else {
						media.pause();
					}
					
					return false;
				});
			
			media.addEventListener('canplay', function(){
				play.removeClass('onebutton-loading');
			}, false);

			media.addEventListener('play',function() {
				play.removeClass('mejs-play').addClass('mejs-pause');
			}, false);
			media.addEventListener('playing',function() {
				play.removeClass('mejs-play').addClass('mejs-pause');
			}, false);

			media.addEventListener('pause',function() {
				play.removeClass('mejs-pause').addClass('mejs-play');
			}, false);
			media.addEventListener('paused',function() {
				play.removeClass('mejs-pause').addClass('mejs-play');
			}, false);
		}
	});
	
})(mejs.$);
