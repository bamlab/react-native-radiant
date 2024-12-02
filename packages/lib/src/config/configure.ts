type Font = {
  fontFamily: string;
  fontPath: string;
};

type ConfigureOptions = {
  fonts: Font[];
};

const globalFonts: Font[] = [];

function configure(options: ConfigureOptions) {
  if (options.fonts) {
    if (!Array.isArray(options.fonts)) {
      throw new Error('options.fonts must be an array');
    }
    globalFonts.push(...options.fonts);
  }
}

export { configure, globalFonts };
