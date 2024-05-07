import sys
from PIL import Image

Image.MAX_IMAGE_PIXELS = 1000000000

def convert_to_png(input_file, output_file):
    # Open the input image
    img = Image.open(input_file)

    # Save the image in .png format
    img.save(output_file + '.png')

if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    convert_to_png(input_file, output_file)
