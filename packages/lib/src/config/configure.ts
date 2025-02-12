import { ReactTestRendererJSON } from 'react-test-renderer';

type Font = {
  fontFamily: string;
  fontPath: string;
};

type Mapper = {
  inputElement: string | string[];
  outputElement: (node: ReactTestRendererJSON) => { type: string; props: Record<string, unknown> };
};

type ConfigureOptions = {
  fonts?: Font[];
  defaultFallbackImage?: string;
  additionalMappers?: Mapper[];
};

const globalFonts: Font[] = [];

let remoteFallbackImage = '';

const additionalMappers: Mapper[] = [];

function configure(options: ConfigureOptions) {
  if (options.fonts) {
    if (!Array.isArray(options.fonts)) {
      throw new Error('options.fonts must be an array');
    }
    globalFonts.push(...options.fonts);
  }

  if (options.defaultFallbackImage) {
    remoteFallbackImage = options.defaultFallbackImage;
  }

  if (options.additionalMappers) {
    if (!Array.isArray(options.additionalMappers)) {
      throw new Error('options.additionalMappers must be an array');
    }
    additionalMappers.push(...options.additionalMappers);
  }
}

export { configure, globalFonts, remoteFallbackImage, additionalMappers, Mapper };
