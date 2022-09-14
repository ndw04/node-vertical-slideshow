# Vertical Slideshow Maker (Using Node.js, Sharp and FFMPEG)

### Installation
`git clone && npm install` :)

### Short description of the idea
1. Input of images of varying sizes
2. Resize images to match width
3. Merge images into one by joining them vertically
4. Spawn subprocess (FFMPEG)
5. Pipe newly cropped images into FFMPEG
6. FFMPEG exports the finished product
