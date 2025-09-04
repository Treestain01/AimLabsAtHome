import pyautogui
import keyboard
import time
from PIL import ImageGrab

TARGET_COLOR = (245, 15, 57)  # RGB for #f50f39
RUNNING = False

def find_and_click_color():
    screen_width, screen_height = pyautogui.size()
    left = 0
    top = 0
    right = screen_width
    bottom = screen_height
    
    # Grab screenshot of the entire screen
    img = ImageGrab.grab(bbox=(left, top, right, bottom))
    pixels = img.load()

    for y in range(img.height):
        for x in range(img.width):
            if pixels[x, y][:3] == TARGET_COLOR:
                pyautogui.click(x + left, y + top)
                print(f"Clicked at ({x + left}, {y + top})")
                return
    print("Target color not found.")

def main():
    global RUNNING
    print("Press ` to start/stop aimbot.")
    while True:
        if keyboard.is_pressed('`'):
            RUNNING = not RUNNING
            print("Aimbot started." if RUNNING else "Aimbot stopped.")
            time.sleep(0.5)  # Debounce key press

        while RUNNING:
            find_and_click_color()
            if keyboard.is_pressed('`'):
                RUNNING = False
                print("Aimbot stopped.")
                time.sleep(0.5)  # Debounce key press
            time.sleep(0.2)  # Adjust for performance

        time.sleep(0.1)

if __name__ == "__main__":
    main()