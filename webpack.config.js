// Importação dos plugins necessários
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

  // O arquivo principal da nossa aplicação
  entry: './src/index',

  // A saída da aplicação quando for feito a build de produção
  // Aqui você especifica a pasta e
  // o nome dos bundles, seguindo a seguinte tabela:
  // https://webpack.js.org/configuration/output/#outputdevtoolmodulefilenametemplate
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[id].[hash].bundle.js',
  },

  // Extensões que o webpack deve processar
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },

  module: {
    // Nessa parte, define-se os loaders que serão
    // utilizados pelo webpack
    rules: [
      // Carregamento do Babel
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      // Carregamento do Sass/SCSS
      {
        test: /\.s[ac]ss$/i,
        // O webpack carrega o loader de trás pra frente:
        // resolve-url-loader -> sass-loader ->
        // css-loader -> style-loader | mini-css
        use: [
          // Todo o CSS injetdo como inline,
          // é mais rápido para criar e lento para executar
          // Por isso a condicional para escolher entre
          // style-loader e mini-css
          process.env.NODE_ENV !== 'production' ?
            'style-loader' :
            {
              loader: MiniCssExtractPlugin.loader,
            },
          // Armazena o conteúdo CSS em CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          // Compila Sass/SCSS em CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
          // Resolve os import e url relativo ao
          // arquivo que está executando-os para o funcionamento
          // do Sass
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        // Carrega as imagens através do webpack
        // para a aplicação.
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              // Nome das imagens na build
              name: '[hash].[ext]',
              // Diretório de todas as imagens na pasta dist
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  // Instâncias dos plugins
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      // Opção para o funcionamento com o ESLint
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // Caminho do index.html para injetar os bundles
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      // Nome dos arquivos CSS gerados na build de produção
      filename: 'css/[id].[hash].css',
    }),
  ],
  optimization: {
    // Minimização da saída JavaScript com a remoção dos comentários
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    },
    )],
  },
};