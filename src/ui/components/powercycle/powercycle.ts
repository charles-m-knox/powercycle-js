// import GObject from 'gi://GObject?version=2.0';
// import Gdk from 'gi://Gdk?version=4.0';
import Adw from 'gi://Adw?version=1';
import GLib from 'gi://GLib?version=2.0';
import Gtk from 'gi://Gtk?version=4.0';
import Gio from 'gi://Gio';
import Template from 'ui/components/powercycle/powercycle.ui';
import Titlebar from 'ui/components/powercycle/titlebar.ui';
import { updatePower } from 'shared/lib/power';
import { readFile, writeFile } from 'ui/lib/file';
import { CONTROL_FILE, QUIT_FILE, RECONNECT_FILE, STATS_FILE } from 'shared/lib/file';
import { getAboutDialog } from './about';
import { getAboutDialogAction } from './titlebar';

Adw.init();

let window: Gtk.ApplicationWindow | null = null;
let builder: Gtk.Builder | null = null;
let root: Adw.StatusPage | null = null;
let titlebar: Adw.HeaderBar | null = null;
let hundredsBtn: Gtk.Adjustment | null = null;
let tensBtn: Gtk.Adjustment | null = null;
let onesBtn: Gtk.Adjustment | null = null;
let reconnectBtn: Adw.ButtonRow | null = null;
let aboutDialog: Adw.AboutDialog | null = null;

// let appActionGroup: Gio.SimpleActionGroup | null = null;
let aboutDialogAction: Gio.SimpleAction | null = null;

let power = 0;

const loop = GLib.MainLoop.new(null, false);
const app = new Adw.Application({
  applicationId: 'com.charlesmknox.powercycle',
  flags: 0,
});
app.connect('activate', onActivate);
const status = app.run([]);

console.log('Finished with status:', status);

function onActivate() {
  window = new Gtk.ApplicationWindow({ application: app });
  window.set_title('Powercycle');
  window.set_default_size(300, 500);
  window.connect('close-request', onQuit);

  builder = Gtk.Builder.new_from_string(Template, Template.length);
  builder.add_from_string(Titlebar, Titlebar.length);

  root = builder.get_object('root') as Adw.StatusPage;
  titlebar = builder.get_object('titlebar') as Adw.HeaderBar;
  hundredsBtn = builder.get_object('hundredsBtn') as Gtk.Adjustment;
  tensBtn = builder.get_object('tensBtn') as Gtk.Adjustment;
  onesBtn = builder.get_object('onesBtn') as Gtk.Adjustment;
  reconnectBtn = builder.get_object('reconnectBtn') as Adw.ButtonRow;

  aboutDialog = getAboutDialog();

  window.set_titlebar(titlebar);

  // signal connections
  hundredsBtn?.connect('value-changed', onHundredsChanged);
  tensBtn?.connect('value-changed', onTensChanged);
  onesBtn?.connect('value-changed', onOnesChanged);
  reconnectBtn?.connect('activated', onReconnectClicked);

  // action group setup
  // appActionGroup = getAppActionGroup();
  aboutDialogAction = getAboutDialogAction(window, aboutDialog);
  // appActionGroup.add_action(aboutDialogAction);

  app.add_action(aboutDialogAction);

  const closeButton = builder.get_object('closeButton') as Gtk.Button;
  closeButton?.connect('clicked', () => window?.close());

  setInterval(async () => {
    if (!root) return;
    root.set_description(await readFile(STATS_FILE));
  }, 1000);

  if (root) window.set_child(root);
  // if (root) window.set_content(root); // if using Adw.ApplicationWindow
  window.present();

  loop.run();
}

async function onQuit() {
  console.log('broadcasting quit request.');
  await writeFile(QUIT_FILE, new Date().getTime().toString());
  console.log('broadcasted quit request.');
  console.log('quitting...');
  setTimeout(() => loop.quit(), 50);
  loop.quit();
  app.quit();
  return false;
}

function setValues() {
  hundredsBtn?.set_value(Math.floor((power % 1000) / 100));
  tensBtn?.set_value(Math.floor((power % 100) / 10));
  onesBtn?.set_value(Math.floor((power % 10) / 1));
  // root?.set_description(`Current target: ${power} W`);
}

function displayPower(newPower: number) {
  if (newPower >= 1000) {
    newPower = 999;
  } else if (newPower < 0) {
    newPower = 0;
  }

  power = newPower;

  setValues();
  writeFile(CONTROL_FILE, power.toString());
}

function onHundredsChanged(btn: Gtk.Adjustment) {
  displayPower(updatePower(power, btn.value, 100));
}

function onTensChanged(btn: Gtk.Adjustment) {
  displayPower(updatePower(power, btn.value, 10));
}

function onOnesChanged(btn: Gtk.Adjustment) {
  displayPower(updatePower(power, btn.value, 1));
}

function onReconnectClicked(/* btn: Adw.ButtonRow */) {
  log('reconnecting');
  writeFile(RECONNECT_FILE, '');
}
