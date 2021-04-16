const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('./utils/InterpolateHtmlPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const postcssNormalize = require('postcss-normalize');


const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const appPackageJson = require(paths.appPackageJson);
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: {}
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // ident: 'postcss',
          postcssOptions: {
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              require('postcss-preset-env')({
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              }),
              postcssNormalize(),
            ]
          }
        }
      }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  }

  console.log(paths.publicUrlOrPath, 'paths.publicUrlOrPath');

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction ? shouldUseSourceMap ? 'source-map' : false : isEnvDevelopment && 'cheap-module-source-map',
    entry: paths.appIndexJs,
    output: {
      // The build folder.
      path: isEnvProduction ? paths.appBuildDist : undefined,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: isEnvDevelopment,
      // There will be one main bundle, and one file per asynchronous chunk.
      // In development, it does not produce real files.
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/[name].js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      // webpack uses `publicPath` to determine where the app is being served from.
      // It requires a trailing slash, or the file assets will get an incorrect path.
      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath: paths.publicUrlOrPath,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\/g, '/')
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
      // this defaults to 'window', but by setting it to 'this' then
      // module chunks which are built will work in web workers as well.
      globalObject: 'this',
      // 每次构建之前都要清理文件夹
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      alias: {
        '@': paths.appSrc,
      }
    },
    module: {
      rules: [
        // {
        //   test: /\.tsx?$/i,
        //   loader: 'awesome-typescript-loader',
        //   exclude: /node_modules/,
        //   options: {
        //     getCustomTransformers: () => ({
        //       before: [
        //         tsImportPluginFactory([{
        //           libraryName: 'antd',
        //           libraryDirectory: 'lib',
        //           style: 'css'
        //         }])
        //       ]
        //     })
        //   }
        // },
        // {
        //   test: /\.(js|mjs|jsx)$/,
        //   exclude: /node_modules/,
        //   loader: require.resolve('babel-loader'),
        //   options: {
        //     plugins: [
        //       isEnvDevelopment &&
        //       require.resolve('react-refresh/babel')
        //     ].filter(Boolean)
        //   }
        // },

        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            // presets: [
            //   [
            //     require.resolve('babel-preset-react-app'),
            //   ],
            // ],
            // plugins: [
            //   require.resolve('babel-plugin-named-asset-import'),
            //   isEnvDevelopment &&
            //   require.resolve('react-refresh/babel')
            // ].filter(Boolean)
          }
        },
        {
          oneOf: [
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction,
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction,
              }),
            },
            {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction,
                },
                'less-loader'
              ),
              sideEffects: true,
            },
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction,
                },
                'less-loader'
              ),
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction,
                },
                'sass-loader'
              ),
              sideEffects: true,
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction,
                },
                'sass-loader'
              ),
            },
            // {
            //   test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            //   loader: require.resolve('url-loader'),
            //   options: {
            //     limit: 10000,
            //     name: 'static/media/[name].[hash:8].[ext]',
            //   },
            // },
            // {
            //   loader: require.resolve('file-loader'),
            //   exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            //   options: {
            //     name: 'static/media/[name].[hash:8].[ext]',
            //   },
            // },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset',
              generator: {
                filename: 'static/media/[hash:8].[name][ext]',
              },
            },
            {
              test: /\.(eot|svg|ttf|woff|woff2?)$/,
              type: 'asset/resource',
              generator: {
                filename: 'static/media/[hash:8].[name][ext]',
              },
            },

          ]
        }
      ],
      // 如果一些第三方模块没有使用AMD/CommonJs规范，
      // 可以使用noParse来标记这个模块，这样Webpack在导入模块时，
      // 就不进行解析和转换，提升Webpack的构建速度；
      // noParse可以接受一个正则表达式或者一个函数

      // noParse: function(content) {
      //   return /lodash|chartjs/.test(content)
      // }
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
            favicon: paths.appPublic + '/favicon.ico',
            // publicPath: '/'
          },
          isEnvProduction
          ? {
            minify: {
              // 清除html中的注释
              removeComments: true,
              // 清除html中的空格、换行符
              // 将html压缩成一行
              collapseWhitespace: true,
              // 当值与默认值匹配时，删除属性。
              removeRedundantAttributes: true,
              // doctype用短（HTML5）文档类型替换
              useShortDoctype: true,
              // 删除所有内容为空的元素
              removeEmptyAttributes: true,
              // 清除style和link标签的type属性
              removeStyleLinkTypeAttributes: true,
              // 在单例元素上保留斜线
              keepClosingSlash: true,
              // 缩小脚本元素和事件属性中的JavaScript（使用Terser）
              minifyJS: true,
              // 压缩html的行内样式成一行
              minifyCSS: true,
              // 缩小各种属性中的URL（使用relatedurl）
              minifyURLs: true,
            },
          } : undefined
        )
      ),
      // new WebpackManifestPlugin({
      //   fileName: 'asset-manifest.json',
      //   publicPath: paths.publicUrlOrPath,
      //   generate: (seed, files, entrypoints) => {
      //     const manifestFiles = files.reduce((manifest, file) => {
      //       manifest[file.name] = file.path;
      //       return manifest;
      //     }, seed);
      //     const entrypointFiles = entrypoints.main.filter(
      //       fileName => !fileName.endsWith('.map')
      //     );

      //     return {
      //       files: manifestFiles,
      //       entrypoints: entrypointFiles,
      //     };
      //   },
      // }),
      // 该插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。它支持CSS和SourceMap的按需加载
      isEnvProduction && new MiniCssExtractPlugin({
        // 选项类似于webpackOptions.output中的相同选项
        // 两个选项都是可选的
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      // 打包代码大小分析工具
      // new BundleAnalyzerPlugin({
      //   analyzerPort: 9999,
      //   openAnalyzer: false,
      // }),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        'PUBLIC_URL': paths.publicUrlOrPath.slice(0, -1)
      }),
      new webpack.DefinePlugin({
        'process.env.ASSET_PATH': JSON.stringify(process.env.ASSET_PATH || '/'),
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       from: paths.appPublic,
      //       to: 'assets',
      //       globOptions: {
      //         ignore: ['*.DS_Store'],
      //       },
      //       noErrorOnMissing: true,
      //     },
      //   ],
      // })
    ].filter(Boolean),
    optimization: {
      minimize: isEnvProduction,
      chunkIds: 'deterministic',
		  moduleIds: 'deterministic',
      minimizer: [
        new TerserPlugin({
          test: /\.(ts|tsx|js|jsx)$/,
          extractComments: true,
          parallel: true,
        })
      ],
      splitChunks: {
        // 代码分割时默认对异步代码生效，all：所有代码有效 意味着即使在异步和非异步块之间也可以共享块，inital：同步代码有效，async: 异步代码有效
        chunks: 'all',
        // 代码分割最小的模块大小，引入的模块大于 20000B 才做代码分割
        minSize: 20000,
        // 代码分割最大的模块大小，大于这个值要进行代码分割，一般使用默认值
        // maxSize: 0,
        // 引入的次数大于等于1时才进行代码分割
        minChunks: 1,
        // 最大的异步请求数量,也就是同时加载的模块最大模块数量
        maxAsyncRequests: 30,
        // 入口文件做代码分割最多分成 30 个 js 文件
        maxInitialRequests: 30,
        // 文件生成时的连接符
        automaticNameDelimiter: '~',
        // 强制执行拆分的大小阈值和其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略
        enforceSizeThreshold: 50000,
        cacheGroups: {
          vendors: {
            name: 'chunk-verdors',
            // 位于node_modules中的模块做代码分割
            test: /[\\/]node_modules[\\/]/,
            // 根据优先级决定打包到哪个组里，例如一个 node_modules 中的模块进行代码
            priority: -10,
            chunks: 'initial'
          },
          common: {
            // 没有 test 表明所有的模块都能进入 common 组，但是注意它的优先级较低。
            // 根据优先级决定打包到哪个组里,打包到优先级高的组里。
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            // 如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
            reuseExistingChunk: true
          },
          //涉及react的模块
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)/,
            priority: 10,
            name: 'react'
          },
        }
      }
    },
    stats: {
      all: false, warnings: true, errors: true
    }
  }
}
