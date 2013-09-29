var ill = ill || {};
(function ($) {

	// default playlist values
	ill.LessonPlaylistDefaults = {
        downloadFallbackTip: true
	};

  	// wraps a MediaElement object in player controls
	ill.LessonPlaylist = function(node, o) {
        // enforce object, even without "new" (via John Resig)
		if ( !(this instanceof ill.LessonPlaylist) ) {
			return new ill.LessonPlaylist(node, o);
		}
        
		var t = this;
        
        t.$node = $(node);
        
        t.options = $.extend({},ill.LessonPlaylistDefaults,o);

        t.init();

        return t;
    };
    
    ill.LessonPlaylist.prototype = {
        init: function(){
            var t  = this,
                    $current;
            
            t.$node.find('audio, video').wrap(function(){
                return '<span class="lesson-media-track lesson-' + this.tagName.toLowerCase() + '"><span class="lesson-media-mediaelementplayer" style="display: none;"></span><span class="lesson-media-icon"></span><span class="lesson-media-title">' + $(this).data('title') + '</span><a href="' + this.src +'" download class="lesson-media-download">Download</a></span>';
            });
            
            t.$node.find('.lesson-media-track .lesson-media-title, .lesson-media-track .lesson-media-icon').bind('click', function(){
                var $line = $(this).closest('.lesson-media-track');
                
                if ($line.is($current)) {
                    return;
                }
                
                if ($current) {
                    // stop & hide
                    $current.prepend(t.$node.children('.lesson-media-mediaelementplayer').hide());
                }
                $current = $line;
                $player = $line.find('.lesson-media-mediaelementplayer');
                $player.children('audio,video').mediaelementplayer(t.options);
                t.$node.prepend($player);
                $player.show();
            });
            
            if (t.options.downloadFallbackTip) {
                t.addDownloadFallbackTip();
            }
        },
        addDownloadFallbackTip: function() {
            this.$node.find('.lesson-media-download').append($('<span class="download-tooltip"><span class="corner"></span>Right Click &amp; &apos;Save As&apos;</span>'));
        }
    };

	// turn into jQuery plugin
	if (typeof jQuery !== 'undefined') {
		jQuery.fn.LessonPlaylist = function (options) {
            this.each(function () {
                jQuery(this).data('lessonplaylist', new ill.LessonPlaylist(this, options));
            });
			return this;
		};
	}

})(jQuery);