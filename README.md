# Powercycle JS

A Gnome/libadwaita/gtk4 app that allows you to control your indoor bike's smart trainer's power with a very simple interface and an ANT+ USB stick.

Leverages the `gjs` runtime for the GUI.

## Screenshot

![Powercycle JS running](./screenshots/screenshot.png)

## Setup

Built with Node 20, but may work with other versions.

```bash
sudo pacman -S gjs gtk4 libadwaita libusb libgusb
pnpm install

# finding your ANT+ device ID requires uncommenting "await fes.scan();" in event.ts.
# sorry this is awkward right now, but i hope to improve it later, if i can find the time
export POWERCYCLE_ANT_CHANNEL_ID=0
export POWERCYCLE_ANT_DEVICE_ID=5555

pnpm run start
```

You also need to set up the udev rules for your ant+ USB stick:

Edit `/etc/udev/rules.d/99-ant.rules`

```text
SUBSYSTEM=="usb", ATTR{idVendor}=="0fcf", ATTR{idProduct}=="1008", MODE="0666"
SUBSYSTEM=="usb", ATTR{idVendor}=="0fcf", ATTR{idProduct}=="1009", MODE="0666"
```

Then run:

```bash
sudo udevadm control --reload-rules
sudo udevadm trigger
```

You also *may* need to be a part of the `dialout` group (unverified).

## Reference

- <https://gnome.pages.gitlab.gnome.org/libadwaita/doc/main/style-classes.html>
- `/usr/share/icons/Adwaita/symbolic/` for icons

## Comments

- This application is unpolished, unfinished, and may be unstable. Despite this fact, I use it regularly and find it to be good enough for daily use.
- I wrote this as an example of leveraging `gjs` for libadwaita/gtk4 and it's mostly for fun/personal gain
- If you make improvements, please contribute them back in accordance with the license
- This application consists of two components:
  - **GUI**: A libadwaita app that has a very minimal interface inspired by a commonly used app for smart trainers.
  - **Server**: A headless Node program that connects to the ANT+ USB stick and writes device data to a file.
  - *Why does it have two components?* The `gjs` runtime is limited and doesn't seem to support the ANT+ libusb interactions that are required. We have to use Node.
- Instead of using websockets for IPC, the GUI watches for changes to files called `.control`, `.stats`, and `.quit`, which are written to by the server.
- I need to refactor and clean up lots of this code, don't judge me, this is something I do in my limited spare time
- Doesn't support heart rate yet, but I'd like to do that soon

## Troubleshooting

If you run into problems, it might be caused by a few things:

- Put your ANT+ USB stick closer to your trainer with a USB extension cord
- Unplug your ANT+ USB stick, kill this application (server and ui), plug in the stick, then restart the application
- Make sure you followed the udev rules steps above, and make sure you have permissions to talk to the device (restart/full log out may be necessary)
