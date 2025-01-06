import { gettext as _ } from 'gettext';
import Adw from 'gi://Adw?version=1';
import Gtk from 'gi://Gtk?version=4.0';

export const getAboutDialog = (/* window: Adw.ApplicationWindow | Gtk.ApplicationWindow */) => {
  const dialog = new Adw.AboutDialog({
    application_icon: 'application-x-executable',
    application_name: 'Powercycle',
    developer_name: 'Charles M. Knox',
    version: '0.0.1',
    comments: _(
      "Powercycle is an application that allows you to control your bike's smart trainer.",
    ),
    website: 'https://github.com/charles-m-knox/powercycle-js',
    issue_url: 'https://github.com/charles-m-knox/powercycle-js/issues',
    support_url: 'https://github.com/charles-m-knox/powercycle-js/issues',
    copyright: '© 2024 Charles M. Knox',
    license_type: Gtk.License.AGPL_3_0_ONLY,
    developers: ['Charles M. Knox <powercycle-contact@charlesmknox.com>'],
    artists: ['None'],
    translator_credits: _('translator-credits'),
  });

  dialog.add_link(_('Documentation'), 'https://github.com/charles-m-knox/powercycle-js');

  // dialog.add_legal_section(
  //   _("Fonts"),
  //   null,
  //   Gtk.License.CUSTOM,
  //   _(
  //     "This application uses font data from <a href='https://example.org'>somewhere</a>.",
  //   ),
  // );

  //   dialog.add_acknowledgement_section(_('Special thanks to'), [_('My cat')]);

  //   dialog.present(window);
  return dialog;
};
