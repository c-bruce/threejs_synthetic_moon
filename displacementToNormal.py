import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = 1000000000

def calculate_normal_map(displacement_map):
    print('Calculating normal map...')
    # Calculate the gradient using central differences
    dz_dx = np.gradient(displacement_map, axis=1)
    dz_dy = np.gradient(displacement_map, axis=0)

    # Create grid of coordinates
    x = np.arange(displacement_map.shape[0])
    y = np.arange(displacement_map.shape[1])
    xx, yy = np.meshgrid(x, y, indexing='ij')

    # Calculate the tangent vectors
    tangent_x = np.stack((np.ones_like(xx), np.zeros_like(xx), dz_dx), axis=-1)
    tangent_y = np.stack((np.zeros_like(yy), np.ones_like(yy), dz_dy), axis=-1)

    # Calculate the normal vector
    normal_vector = np.cross(tangent_x, tangent_y)
    normal_vector /= np.linalg.norm(normal_vector, axis=-1, keepdims=True)

    return normal_vector

def export_normal_map(normal_map, file_path):
    print('Exporting normal map...')
    # Scale normal vector components to range [0, 255]
    scaled_normal_map = (normal_map + 1) * 127.5

    # Convert to uint8 and create image
    normal_image = Image.fromarray(scaled_normal_map.astype(np.uint8))
    
    # Save the image
    normal_image.save(file_path)

# Load the displacement map
pixel_length_km = ((2 * np.pi * 1737.1) / 360) / 64
displacement_map = np.array(Image.open("moon_displacement.tiff"))
scaled_displacement_map = displacement_map / pixel_length_km

# Calculate the normal map
normal_map = calculate_normal_map(displacement_map)

# Export the normal map
export_normal_map(normal_map, "moon_normal_map.png")
