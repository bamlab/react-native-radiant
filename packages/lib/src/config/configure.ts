type Font = {
  fontFamily: string;
  fontPath: string;
};

type ConfigureOptions = {
  fonts?: Font[];
  defaultFallbackImage?: string;
};

const globalFonts: Font[] = [];

let defaultFallbackImage = '';

function configure(options: ConfigureOptions) {
  if (options.fonts) {
    if (!Array.isArray(options.fonts)) {
      throw new Error('options.fonts must be an array');
    }
    globalFonts.push(...options.fonts);
  }

  if (options.defaultFallbackImage) {
    defaultFallbackImage = options.defaultFallbackImage;
  }
}

export { configure, globalFonts, defaultFallbackImage };
