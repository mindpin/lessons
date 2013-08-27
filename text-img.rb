# -*- coding: utf-8 -*-
require 'RMagick'  # gem install rmagick

def file_read(filename)
  return nil if !File.exist?(filename)
  content = ""
  File.open(filename) do |file|
    content = file.read
  end
  puts content
  return content
end

def img_init(str,width,height,img_name)
  img = Magick::Image.new(width,height,Magick::HatchFill.new('white','white'))
  gc = Magick::Draw.new
  gc.stroke('transparent')
  gc.pointsize(24)

  gc.font("luxirbi.ttf")  
  gc.text(20,40, str)  

  gc.draw(img)
  img.write(img_name)  
end


param = ARGV[0]

filename = file_read(param)

if filename.nil?
  p 'not fond'
else
  img_init(filename, 440, 800, 'img.jpg')
end


