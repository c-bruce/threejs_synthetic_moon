import numpy as np
from PIL import Image

def save_as_float_grayscale_image(array, filename):
    # Scale array values between 0 and 1
    scaled_array = (array - np.min(array)) / (np.max(array) - np.min(array))
    
    # Create grayscale image from array
    img = Image.fromarray(scaled_array)
    
    # Save image
    img.save(filename)

displacement_map = np.array(Image.open("moon_displacement.tiff"))

# Save as grayscale image with floats between 0.0 and 1.0
save_as_float_grayscale_image(displacement_map, 'scaled_moon_displacement.tiff')