require 'compass/import-once/activate'
# Require any additional compass plugins here.
# Set this to the root of your project when deployed:
# @see http://compass-style.org/help/documentation/configuration-reference/
http_path = "/"
css_dir = "build/css"
sass_dir = "sass"
images_dir = "/images"
javascripts_dir = "js"
fonts_path = "build/fonts"  
# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :compressed
# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true
sourcemap=true
# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

#asset_cache_buster = :none
cache = false
# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
preferred_syntax = :scss
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
