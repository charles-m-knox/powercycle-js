import Gio from 'gi://Gio';

export const writeFile = async (filePath: string, content: string): Promise<void> => {
  const file = Gio.File.new_for_path(filePath);
  let outputStream;

  try {
    outputStream = file.replace(null, false, Gio.FileCreateFlags.NONE, null);
    outputStream.write_all(content, null);
    outputStream.close(null);
  } catch (e) {
    console.error('Error writing file: ', e);
  }

  return Promise.resolve();
};

export const readFile = async (filePath: string): Promise<string | null> => {
  try {
    const file = Gio.File.new_for_path(filePath);
    const [success, uintarray] = file.load_contents(null);
    if (success) {
      return Promise.resolve(new TextDecoder('utf-8').decode(uintarray));
    } else {
      logError(new Error('Failed to read the file.'));
      return Promise.resolve(null);
    }
  } catch (error) {
    logError(error);
    return Promise.resolve(null);
  }
};
