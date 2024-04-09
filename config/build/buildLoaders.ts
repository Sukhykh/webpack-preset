import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { ModuleOptions } from 'webpack'
import { BuildOptions } from './types/types'

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
	const isDev = options.mode === 'development'

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	}

	const cssLoader = {
		test: /\.css$/i,
		use: [isDev ? 'style-loader' : MiniCssExtractPlugin, 'css-loader'],
	}

	const babelLoader = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env', '@babel/preset-typescript'],
			},
		},
	}

	return [assetLoader, cssLoader, babelLoader]
}
