function classNameElement(basename, element) {
  if (!element) {
    return basename;
  }

  return `${basename}__${element}`;
}

function classNameModifiers(basename, ...params) {
  const modifiers = params.reduce(
    (mod, p) => {
      if (!p) {
        return mod;
      }

      if (Array.isArray(p)) {
        return mod.concat(p.map(e => `${basename}--${e}`));
      }

      if (typeof p === 'object') {
        return Object.keys(p).reduce((memo, e) => {
          if (p[e]) {
            memo.push(`${basename}--${e}`);
          }

          return memo;
        }, mod);
      }

      mod.push(`${basename}--${p}`);

      return mod;
    },
    [basename]
  );

  return modifiers.join(' ');
}

export { classNameElement, classNameModifiers };
