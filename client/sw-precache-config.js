module.exports = {
    staticFileGlobs: [
        'build/static/css/**.css',
        'build/static/js/**.js',
        'build/static/media/**',
        'build/index.html',
    ],
    navigateFallback: 'index.html',
    swFilePath: './build/service-worker.js',
    stripPrefix: 'build/',
    handleFetch: false
};