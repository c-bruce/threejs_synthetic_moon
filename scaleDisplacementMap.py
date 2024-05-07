import sys
import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = 1000000000

def save_as_float_grayscale_image(array, filename):
    # Scale array values between 0 and 1
    scaled_array = (array - np.min(array)) / (np.max(array) - np.min(array))

    # Create grayscale image from array
    print(scaled_array.max(), scaled_array.min())
    img = Image.fromarray((scaled_array * 255).astype(np.uint8))
    img.convert("L")

    # Save image
    img.save(filename + '.png')

def main(input_file, output_file):
    displacement_map = np.array(Image.open(input_file))

    # Save as grayscale image with floats between 0.0 and 1.0
    save_as_float_grayscale_image(displacement_map, output_file)

if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    main(input_file, output_file)
