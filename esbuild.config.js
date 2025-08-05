module.exports = {
  loader: {
    ".node": "empty",
  },
  external: [
    '@udecode/plate-common/server',
    'zustand/traditional'
  ],
  alias: {
    '@udecode/plate-common/server': '@udecode/plate-common',
    'zustand/traditional': 'zustand'
  }
};
