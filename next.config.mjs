/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      '@udecode/plate-common/server': 'commonjs @udecode/plate-common/server',
    });
    
    return config;
  },
  transpilePackages: [
    '@udecode/plate-common',
    '@udecode/plate-slash-command',
    '@udecode/plate-combobox',
    '@udecode/plate-diff',
    '@udecode/plate-resizable',
    '@udecode/plate-toggle',
    '@udecode/plate-indent',
    'zustand-x'
  ],
};

export default nextConfig;