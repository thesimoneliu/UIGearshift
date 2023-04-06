# Prototyping Guide

### First, you need to get the server running on your local computer

1. Connect your computer to the WiFi
2. Download this file, or clone this file to your local computer
3. On your computer, open the terminal and direct to this file
4. In your terminal, run `npm install`
5. Then run `npx parcel build index.html`
6. You can now view the prototype live at http://localhost:8080

### Then, you can test this prototype in your targeted device (now Safari on iOS deviced only) following the steps below

1. Get your IP address (your-IP-address) from your computer,
2. Ensure your targeted uses the same WiFi as your computer does
3. Open Safari
4. Go to http://your-IP-address:8080
5. You will be able to view the live prototype

# Design Statement

This is a response to Tesla's 5-day coding challenge.

I started from discovery and research by looking at current Tesla test-drive and touchscreen videos.<br/>
I am aware that this digital Gear-shifter should be designed under a bigger system and affect other elements on the screen such as the right-side view, the speed display, other elements' positions and etc, which might cause too much complexity if all taken into considerations.<br/>
So I decided to focus only on the gear shifter itself that should be placed on the left side of the screen.<br/>

1. Visual Metaphor

Since this is not a tap-based function, the element of
Neumorphism
Mental Model

buttons

2. Motion States

I designed 5 motion states for overall interaction.

- `normalState` an inactive state when the user is not doing anything
  The gear button is grey. The name of the gear is highlighted white.
- `prepState` a pre-loader state to prevent phantom touch, the user will activate the gear button if pressing it more than 1 second in this state.
  I designed the button
- `prepFailureState` a state when the user fails to press to 1 second, the gear button will return to `normalState`
- `ondragState` an active state when the user is dragging the gear button to shift gears
- `ondragEndState` the end of the dragging state when the gear button snaps to its closet gear mode

![alt text](./assets/motionstates.jpg 'Gear Button in 5 Motion States')

3. Sound

When driving, the failure state can be hard to notice visually. I added sound in `prepFailureState` to notify the user for a second try. I also think the feeling of the sound matches the feeling of the bouncy motion.

Soundfile: [sound file from Pixeabay](https://cdn.pixabay.com/download/audio/2023/01/04/audio_8969bfb5fa.mp3?filename=error-warning-login-denied-132113.mp3g)

4. Bug fixes

- The flashing effect between some frames
-

5. Future Steps

5-day for me is a short tiem to make this prototype as detailed and comprehensive as possible. If there's more time, I'd like to do:

- The metaball effect between gear transitions.

  Originally, when designing a base like this, I was thinking of adding the metaball effect so that when dragging between different gears, the user can see the button flowing from one groove to the other.<br/>
  I've played with it with Touchdesigner. The logic is to blur shapes before sharpening their edges. But I've been using SVG files instead of rasterized images in this prototype. It took me a lot of time to understand how `<feGaussianBlur>` works and more. I saw a paperscript metaball example online. It will be fun to try it out.

- The speed velocity of the dragging movement. I do think

6. Demo
