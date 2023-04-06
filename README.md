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

1. **Visual Metaphor**

   I asked friends about their feelings and opinions about a digital gear-shifter. Most of them told me a digital stalk would be weird. I then decided to design in a way that follows their current mental model. <br/>

   At first, I approached the digital gear button like the old-vintage one with a trigger on the side. Then I figured Tesla actually used that trigger as a 'Park' gear. <br/>

   I then shifted my focus from the similarity of appearance to the similarity of interaction. My assumption here is that the user perceives the gear shifter to be operated to different internal deep grooves. So I'm thinking, instead of switching internal grooves (which sounds vintage and a heavy labor of work), how about making this interaction more fluid, by creating a base with grooves that magnetically attracts the gear button, just like how Maglev feels? <br>

![alt text](./assets/visual-roadmap.jpg 'A Visual Roadmap')

<br/>

2. **Motion States**

   I designed 5 motion states for overall interaction.

- `normalState` an inactive state when the user is not doing anything
  The gear button is grey. The name of the gear is highlighted white.
- `prepState` a pre-loader state to prevent phantom touch, the user will activate the gear button if pressing it more than 1 second in this state.
  I designed the button
- `prepFailureState` a state when the user fails to press to 1 second, the gear button will return to `normalState`
- `ondragState` an active state when the user is dragging the gear button to shift gears
- `ondragEndState` the end of the dragging state when the gear button snaps to its closet gear mode

![alt text](./assets/motionstates.jpg 'Gear Button in 5 Motion States')

<br/>

3. **Sound**

When driving, the failure state can be hard to notice visually. I added sound in `prepFailureState` to notify the user for a second try. I also think the feeling of the sound matches the feeling of the bouncy motion.

Soundfile: [sound file from Pixeabay](https://cdn.pixabay.com/download/audio/2023/01/04/audio_8969bfb5fa.mp3?filename=error-warning-login-denied-132113.mp3g)

<br/>

4. **Bug Explanations**

   1. The flashing effect between some frames
   2. Code performance on iPad/iPhone
   3. Sound not available on iPad/iPhone

<br/>

5. **Future Steps**

   5-day for me is a short tiem to make this prototype as detailed and comprehensive as possible. If there's more time, I'd like to do:

- The metaball effect between gear transitions.

  Originally, when designing a base like this, I was thinking of adding the metaball effect so that when dragging between different gears, the user can see the button flowing from one groove to the other.<br/>
  I've played with it with Touchdesigner. The logic is to blur shapes before sharpening their edges. But I've been using SVG files instead of rasterized images in this prototype. It took me a lot of time to understand how `<feGaussianBlur>` works and more. I saw a paperscript metaball example online. It will be fun to try it out.

- The speed velocity of the dragging movement.

  I do think we need to provide more intuitive, multi-sensory interaction when designing from physical to digital. I thought of 3D vibration, but not sure if this is feasible and proper to apply in an automobile. In the past three days, I tried to apply some resistance to the beginning of the dragging effect. But the `GSAP` library somehow prevent others to view my files and I still need some time to explore how to use velocity to add more vivid motions.

- More bold concepts exploration.

  I approached this problem by thinking of the mental model and neumorphism. What if I don't go too literal about its physical origins and think more abstractly what would signal to the user that the car is now active?

<br/>

6. **Demo**

   **Demo Video** [Link](https://vimeo.com/815479515)

   If you want to test the socket, the current gear sent to the socket will displayed in the console if you run this project on your local computer.

![alt text](./assets/demo-preview.png 'Demo Video Preview')
