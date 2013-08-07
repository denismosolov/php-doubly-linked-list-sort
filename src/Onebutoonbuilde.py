import sys
import os
import shutil

me_filename = 'mediaelement'
mep_filename = 'mediaelementplayer'
onebutton_me_filename = 'onebutton-mediaelement'
onebutton_mep_filename = 'onebutton-mediaelementplayer'
combined_filename = 'mediaelement-and-player'
onebutton_combined_filename = 'mediaelement-and-onebuttonplayer'

# BUILD MediaElement (single file)

print('building MediaElement.js')
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

code = ''

for item in me_files:
	src_file = open('js/' + item,'r')
	code += src_file.read() + "\n"

tmp_file = open('../build/' + me_filename + '.js','w')
tmp_file.write(code)
tmp_file.close()

print('building OnebuttonMediaElement.js')
onebutton_me_files = []
onebutton_me_files.append('onebutton-me-header.js')
onebutton_me_files.append('onebutton-me-namespace.js')
onebutton_me_files.append('onebutton-me-utility.js')
onebutton_me_files.append('onebutton-me-plugindetector.js')
onebutton_me_files.append('onebutton-me-featuredetection.js')
onebutton_me_files.append('onebutton-me-mediaelements.js')
onebutton_me_files.append('onebutton-me-shim.js')

code = ''

for item in onebutton_me_files:
	src_file = open('js/' + item,'r')
	code += src_file.read() + "\n"

tmp_file = open('../build/' + onebutton_me_filename + '.js','w')
tmp_file.write(code)
tmp_file.close()

# BUILD MediaElementPlayer (single file)
print('building OnebuttonMediaElementPlayer.js')
onebutton_mep_files = []
onebutton_mep_files.append('onebutton-mep-header.js')
onebutton_mep_files.append('onebutton-mep-library.js')
onebutton_mep_files.append('onebutton-mep-player.js')
onebutton_mep_files.append('onebutton-mep-feature-playpause.js')

code = ''

for item in onebutton_mep_files:
        src_file = open('js/' + item,'r')
        code += src_file.read() + "\n"

tmp_file = open('../build/' + onebutton_mep_filename + '.js','w')
tmp_file.write(code)
tmp_file.close()

# MINIFY both scripts

print('Minifying JavaScript')
# os.system("java -jar yuicompressor-2.4.2.jar ../build/" + me_filename + ".js -o ../build/" + me_filename + ".min.js --charset utf-8 -v")
# os.system("java -jar yuicompressor-2.4.2.jar ../build/" + mep_filename + ".js -o ../build/" + mep_filename + ".min.js --charset utf-8 -v")
os.system("java -jar compiler.jar --js ../build/" + me_filename + ".js --js_output_file ../build/" + me_filename + ".min.js")
os.system("java -jar compiler.jar --js ../build/" + mep_filename + ".js --js_output_file ../build/" + mep_filename + ".min.js")
os.system("java -jar compiler.jar --js ../build/" + onebutton_me_filename + ".js --js_output_file ../build/" + onebutton_me_filename + ".min.js")
os.system("java -jar compiler.jar --js ../build/" + onebutton_mep_filename + ".js --js_output_file ../build/" + onebutton_mep_filename + ".min.js")


# PREPEND intros
def addHeader(headerFilename, filename):

	# get the header text
	tmp_file = open(headerFilename)
	header_txt = tmp_file.read();
	tmp_file.close()

	# read the current contents of the file
	tmp_file = open(filename)
	file_txt = tmp_file.read()
	tmp_file.close()

	# open the file again for writing
	tmp_file = open(filename, 'w')
	tmp_file.write(header_txt)
	# write the original contents
	tmp_file.write(file_txt)
	tmp_file.close()

addHeader('js/me-header.js', '../build/' + me_filename + '.min.js')
addHeader('js/mep-header.js', '../build/' + mep_filename + '.min.js')


# COMBINE into single script
print('Combining scripts')
code = ''
src_file = open('../build/' + me_filename + '.js','r')
code += src_file.read() + "\n"
src_file = open('../build/' + mep_filename + '.js','r')
code += src_file.read() + "\n"

tmp_file = open('../build/' + combined_filename + '.js','w')
tmp_file.write(code)
tmp_file.close()

src_file = open('../build/' + onebutton_me_filename + '.js','r')
code += src_file.read() + "\n"
src_file = open('../build/' + onebutton_mep_filename + '.js','r')
code += src_file.read() + "\n"

tmp_file = open('../build/' + onebutton_combined_filename + '.js','w')
tmp_file.write(code)
tmp_file.close()

code = ''
src_file = open('../build/' + me_filename + '.min.js','r')
code += src_file.read() + "\n"
src_file = open('../build/' + mep_filename + '.min.js','r')
code += src_file.read() + "\n"

tmp_file = open('../build/' + combined_filename + '.min.js','w')
tmp_file.write(code)
tmp_file.close()

code = ''
src_file = open('../build/' + onebutton_me_filename + '.min.js','r')
code += src_file.read() + "\n"
src_file = open('../build/' + onebutton_mep_filename + '.min.js','r')
code += src_file.read() + "\n"

tmp_file = open('../build/' + onebutton_combined_filename + '.min.js','w')
tmp_file.write(code)
tmp_file.close()


# MINIFY CSS
print('Minifying CSS')
src_file = open('css/mediaelementplayer.css','r')
tmp_file = open('../build/mediaelementplayer.css','w')
tmp_file.write(src_file.read())
tmp_file.close()
os.system("java -jar yuicompressor-2.4.2.jar ../build/mediaelementplayer.css -o ../build/mediaelementplayer.min.css --charset utf-8 -v")

#COPY skin files
print('Copying Skin Files')
shutil.copy2('css/controls.png','../build/controls.png')
shutil.copy2('css/controls.svg','../build/controls.svg')
shutil.copy2('css/bigplay.png','../build/bigplay.png')
shutil.copy2('css/bigplay.svg','../build/bigplay.svg')
shutil.copy2('css/loading.gif','../build/loading.gif')

shutil.copy2('css/mejs-skins.css','../build/mejs-skins.css')
shutil.copy2('css/controls-ted.png','../build/controls-ted.png')
shutil.copy2('css/controls-wmp.png','../build/controls-wmp.png')
shutil.copy2('css/controls-wmp-bg.png','../build/controls-wmp-bg.png')

print('DONE!')
