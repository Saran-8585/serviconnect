export function cva(baseClass, config) {
  return function (props = {}) {
    const { variants, defaultVariants } = config;
    const classes = [baseClass];

    if (variants) {
      for (const [key, variantMap] of Object.entries(variants)) {
        const value = props[key] ?? defaultVariants?.[key];
        if (value && variantMap[value]) {
          classes.push(variantMap[value]);
        }
      }
    }

    return classes.join(' ');
  };
}
