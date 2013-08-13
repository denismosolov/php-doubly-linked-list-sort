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
				$('<div class="mejs-button mejs-playpause-button mejs-play" >' +
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
				}), t;

			media.addEventListener('play',function() {
				play.removeClass('mejs-play').addClass('mejs-pause');
				t = setTimeout(function(){
					play.addClass('onebutton-loading');
				}, player.options.delayWithoutShowingAnimation);
			}, false);
			media.addEventListener('playing',function() {
				if (t) {
					clearTimeout(t);
				}
				play.removeClass('mejs-play onebutton-loading').addClass('mejs-pause');
			}, false);

			media.addEventListener('pause',function() {
				play.removeClass('mejs-pause onebutton-loading').addClass('mejs-play');
			}, false);
			media.addEventListener('paused',function() {
				play.removeClass('mejs-pause onebutton-loading').addClass('mejs-play');
			}, false);
		}
	});
	
})(mejs.$);
