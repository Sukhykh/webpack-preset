import path from 'path'
import webpack from 'webpack'
import { buildWebpack } from './config/build/buildWebpack'
import { BuildMode, BuildPath, BuildPlatform } from './config/build/types/types'

interface EnvVariables {
	mode: BuildMode
	port: number
	analyzer?: boolean
	platform?: BuildPlatform
}

export default (env: EnvVariables) => {
	const paths: BuildPath = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.ts'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		public: path.resolve(__dirname, 'public'),
		src: path.resolve(__dirname, 'src'),
	}

	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 9000,
		mode: env.mode ?? 'development',
		paths,
		analyzer: env.analyzer ?? false,
		platform: env.platform ?? 'desktop',
	})
	return config
}
