const appPaths = require('@easyship/ship-core/paths/app');
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('../util/get-client-environment');
const WebpackBailPlugin = require('../util/webpack-bail-plugin');
const getServedPath = require('../util/get-served-path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const buildConfig = (
    {
        type
    }) => {

    const fileRulesSelector = {
        oneOf: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.scss$/,
                include: appPaths.get().src,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    require.resolve('sass-loader')
                ]
            },
            {
                exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            }
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
        ],
    };

    const webpackConfig = {
        mode: process.env.NODE_ENV,
        resolve: {
            modules: [
                'node_modules',
                appPaths.get().nodeModules
            ],
            extensions: [
                '.web.js',
                '.mjs',
                '.js',
                '.json',
                '.web.jsx',
                '.jsx'
            ],
            alias: {
                'react-native': 'react-native-web'
            },
            plugins: []
        },
        module: {
            strictExportPresence: true,
            rules: [
                fileRulesSelector
            ]
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new CaseSensitivePathsPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ],
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
        optimization: {
            minimizer: []
        },
        performance: {}
    };

    const extendConfig = {
        ['prod']: () => {
            const publicPath = getServedPath();
            const shouldUseRelativeAssetPaths = publicPath === './';
            const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
            const publicUrl = publicPath.slice(0, -1);
            const clientEnvironment = getClientEnvironment(publicUrl);

            if (clientEnvironment.stringified['process.env'].NODE_ENV !== '"production"') {
                throw new Error('Production builds must have NODE_ENV=production.');
            }

            const cssFilename = 'static/css/[name].[contenthash:8].css';

            const extractTextPluginOptions = shouldUseRelativeAssetPaths
                ? { publicPath: Array(cssFilename.split('/').length).join('../') }
                : {};

            webpackConfig.bail = true;
            webpackConfig.devtool = shouldUseSourceMap ? 'source-map' : false;
            webpackConfig.entry = [appPaths.get().indexJs];
            webpackConfig.output = {
                path: appPaths.get().build,
                filename: 'static/js/[name].[chunkhash:8].js',
                chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
                publicPath,
                devtoolModuleFilenameTemplate: info =>
                    path.relative(appPaths.get().src, info.absoluteResourcePath)
                        .replace(/\\/g, '/'),
            };

            webpackConfig.resolve.plugins.push(
                new ModuleScopePlugin(
                    appPaths.get().src,
                    [
                        appPaths.get().packageJson
                    ]
                )
            );

            fileRulesSelector.oneOf.unshift(
                {
                    test: /\.(js|jsx|mjs)$/,
                    include: appPaths.get().src,
                    loader: require.resolve('babel-loader'),
                    options: {
                        compact: true,
                        presets: [
                            require.resolve('@babel/preset-react'),
                            require.resolve('@babel/preset-env')
                        ],
                        plugins: [
                            [
                                require.resolve('@babel/plugin-proposal-class-properties'),
                                {
                                    loose: true
                                }
                            ]
                        ]
                    }
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        Object.assign(
                            {
                                fallback: {
                                    loader: require.resolve('style-loader'),
                                    options: {
                                        hmr: false,
                                    },
                                },
                                use: [
                                    {
                                        loader: require.resolve('css-loader'),
                                        options: {
                                            importLoaders: 1,
                                            minimize: true,
                                            sourceMap: shouldUseSourceMap,
                                        },
                                    },
                                    {
                                        loader: require.resolve('postcss-loader'),
                                        options: {
                                            ident: 'postcss',
                                            plugins: () => [
                                                require('postcss-flexbugs-fixes'),
                                                autoprefixer({
                                                    browsers: [
                                                        '>1%',
                                                        'last 4 versions',
                                                        'Firefox ESR',
                                                        'not ie < 9'
                                                    ],
                                                    flexbox: 'no-2009',
                                                }),
                                            ],
                                        },
                                    },
                                ],
                            },
                            extractTextPluginOptions
                        )
                    )
                }
            );

            webpackConfig.plugins.push(
                new InterpolateHtmlPlugin(HtmlWebpackPlugin, clientEnvironment.raw),
                new HtmlWebpackPlugin({
                    inject: true,
                    template: appPaths.get().html,
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    }
                }),
                new webpack.DefinePlugin(clientEnvironment.stringified),
                new ExtractTextPlugin({
                    filename: cssFilename,
                }),
                new ManifestPlugin({
                    fileName: 'asset-manifest.json',
                }),
                new SWPrecacheWebpackPlugin({
                    dontCacheBustUrlsMatching: /\.\w{8}\./,
                    filename: 'service-worker.js',
                    logger(message) {
                        if (message.indexOf('Total precache size is') === 0) {
                            return;
                        }

                        if (message.indexOf('Skipping static resource') === 0) {
                            return;
                        }

                        console.log(message);
                    },
                    minify: true,
                    navigateFallback: publicUrl + '/index.html',
                    navigateFallbackWhitelist: [/^(?!\/__).*/],
                    staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
                })
            );

            webpackConfig.optimization.minimizer.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            comparisons: false,
                        },
                        mangle: true,
                        output: {
                            comments: false,
                            ascii_only: true,
                        }
                    },
                    sourceMap: shouldUseSourceMap
                })
            );
        },
        ['dev']: () => {
            const publicPath = '/';
            const publicUrl = '';
            const clientEnvironment = getClientEnvironment(publicUrl);

            webpackConfig.devtool = 'cheap-module-source-map';
            webpackConfig.entry = [
                require.resolve('react-dev-utils/webpackHotDevClient'),
                appPaths.get().indexJs
            ];
            webpackConfig.output = {
                pathinfo: true,
                filename: 'static/js/bundle.js',
                chunkFilename: 'static/js/[name].chunk.js',
                publicPath,
                devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
            };

            webpackConfig.resolve.plugins.push(
                new ModuleScopePlugin(
                    appPaths.get().src,
                    [
                        appPaths.get().packageJson
                    ]
                )
            );

            fileRulesSelector.oneOf.unshift(
                {
                    test: /\.(js|jsx|mjs)$/,
                    include: appPaths.get().src,
                    loader: require.resolve('babel-loader'),
                    options: {
                        cacheDirectory: true,
                        presets: [
                            require.resolve('@babel/preset-react'),
                            require.resolve('@babel/preset-env')
                        ],
                        plugins: [
                            [
                                require.resolve('@babel/plugin-proposal-class-properties'),
                                {
                                    loose: true
                                }
                            ]
                        ]
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    })
                                ]
                            }
                        }
                    ],
                }
            );

            webpackConfig.plugins.push(
                new InterpolateHtmlPlugin(HtmlWebpackPlugin, clientEnvironment.raw),
                new HtmlWebpackPlugin({
                    inject: true,
                    template: appPaths.get().html
                }),
                new webpack.DefinePlugin(clientEnvironment.stringified),
                new webpack.HotModuleReplacementPlugin(),
                new WatchMissingNodeModulesPlugin(appPaths.get().nodeModules)
            );

            webpackConfig.performance.hints = false;
        },
        ['test']: () => {
            const publicUrl = '';

            webpackConfig.resolve.alias['@easyship/react-enzyme'] = path.join(appPaths.get().test, 'react-16-enzyme.js');

            webpackConfig.resolve.plugins.push(
                new ModuleScopePlugin(
                    [
                        appPaths.get().src,
                        appPaths.get().test
                    ],
                    [
                        appPaths.get().packageJson
                    ]
                )
            );

            webpackConfig.module.rules.unshift(
                {
                    test: /\.(js|jsx|mjs)$/,
                    enforce: 'post',
                    use: {
                        options: {
                            esModules: true,
                            compact: false,
                            preserveComments: true
                        },
                        loader: require.resolve('istanbul-instrumenter-loader')
                    },
                    include: appPaths.get().src,
                    exclude: /node_modules|\.spec\.js$|\.mock\.js$/
                }
            );

            fileRulesSelector.oneOf.unshift(
                {
                    test: /\.(js|jsx|mjs)$/,
                    include: appPaths.get().src,
                    exclude: /node_modules/,
                    loader: require.resolve('babel-loader'),
                    options: {
                        cacheDirectory: false,
                        presets: [
                            require.resolve('@babel/preset-react'),
                            require.resolve('@babel/preset-env')
                        ],
                        plugins: [
                            [
                                require.resolve('@babel/plugin-proposal-class-properties'),
                                {
                                    loose: true
                                }
                            ]
                        ]
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        require.resolve('style-loader'),
                        {
                            loader: require.resolve('css-loader'),
                            options: {
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9',
                                        ],
                                        flexbox: 'no-2009'
                                    }),
                                ],
                            },
                        },
                    ],
                }
            );

            webpackConfig.plugins.push(
                new webpack.DefinePlugin(getClientEnvironment(publicUrl).stringified),
                new WebpackBailPlugin()
            );

            webpackConfig.performance.hints = false;
        }
    };

    extendConfig[type]();

    return webpackConfig;
};

module.exports = buildConfig;
