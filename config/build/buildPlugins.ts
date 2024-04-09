import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { BuildOptions } from './types/types'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
	const { mode, paths, analyzer, platform } = options
	const isDev = mode === 'development'
	const isProd = mode === 'production'

	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			// favicon: path.resolve(paths.public, 'favicon.icon'),
		}),
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(platform),
			__ENV__: JSON.stringify(mode),
		}),
	]

	if (isDev) {
		plugins.push(new ProgressPlugin())
		plugins.push(new ForkTsCheckerWebpackPlugin())
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash].css',
				chunkFilename: 'css/[name].[contenthash].css',
			})
		)
		plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, 'css'),
						to: path.resolve(paths.output, 'css'),
					},
				],
			})
		)
	}

	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin())
	}

	return plugins
}
