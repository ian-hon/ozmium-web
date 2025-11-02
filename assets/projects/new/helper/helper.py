import os
from moviepy import VideoFileClip

# Directory containing the .mov files
input_folder = "./input"  # Change this to your desired folder path

# Iterate over all files in the folder
for filename in os.listdir(input_folder):
    if filename.lower().endswith(".mov"):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(input_folder, os.path.splitext(filename)[0] + ".gif")
        
        # Load and resize the video
        clip = VideoFileClip(input_path)
        clip_resized = clip.resized(width=512)  # Width auto-scaled
        
        # Write the GIF
        clip_resized.write_gif(output_path, fps=15)
        
        print(f"saved {output_path}")
