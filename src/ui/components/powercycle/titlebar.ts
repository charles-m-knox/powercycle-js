import Gio from 'gi://Gio';
import Adw from 'gi://Adw?version=1';
import Gtk from 'gi://Gtk?version=4.0';

// export const getAppActionGroup = () => new Gio.SimpleActionGroup();

export const getAboutDialogAction = (
  window: Gtk.ApplicationWindow | Adw.ApplicationWindow,
  about: Adw.AboutDialog | Gtk.AboutDialog,
) => {
  const action = new Gio.SimpleAction({
    name: 'about',
    enabled: true,
  });

  action.connect('activate', () => about.present(window));

  return action;
};
