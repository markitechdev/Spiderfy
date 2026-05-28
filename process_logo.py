import os
from PIL import Image

def process_logo(image_path, output_path):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    newData = []
    
    # We want to make the black background transparent
    # The logo has a black background (e.g., #000000 or close)
    # We will use a threshold approach for anti-aliasing
    for item in datas:
        # Get luminance
        r, g, b, a = item
        
        # If it's very close to black, make it transparent
        if r < 15 and g < 15 and b < 15:
            newData.append((255, 255, 255, 0)) # Fully transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    # Optimize and save
    img.save(output_path, "PNG", optimize=True)
    print(f"Saved transparent optimized logo to {output_path}")

if __name__ == "__main__":
    logo_path = r"c:\Users\Mark\Desktop\WebsiteSpiderman\images\logo.png"
    if os.path.exists(logo_path):
        process_logo(logo_path, logo_path)
    else:
        print("Logo not found!")
