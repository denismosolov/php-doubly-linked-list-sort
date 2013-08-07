import sys
import os
import shutil

me_files = []
me_files.append('me-header.js')
me_files.append('me-namespace.js')
me_files.append('me-utility.js')
me_files.append('me-plugindetector.js')
me_files.append('me-featuredetection.js')
me_files.append('me-mediaelements.js')
me_files.append('me-shim.js')
me_files.append('me-i18n.js')
me_files.append('me-i18n-locale-de.js')
me_files.append('me-i18n-locale-zh.js')

for item in me_files:
	shutil.copy2('js/' + item, 'js/onebutton-' + item)

mep_files = []
mep_files.append('mep-header.js')
mep_files.append('mep-library.js')
mep_files.append('mep-player.js')
mep_files.append('mep-feature-playpause.js')
#mep_files.append('mep-feature-stop.js')
#mep_files.append('mep-feature-progress.js')
#mep_files.append('mep-feature-time.js')
#mep_files.append('mep-feature-volume.js')
#mep_files.append('mep-feature-fullscreen.js')
#mep_files.append('mep-feature-tracks.js')
#mep_files.append('mep-feature-contextmenu.js')
#mep_files.append('mep-feature-postroll.js')
# mep_files.append('mep-feature-sourcechooser.js')

for item in mep_files:
	shutil.copy2('js/' + item, 'js/onebutton-' + item)

print('DONE!')
