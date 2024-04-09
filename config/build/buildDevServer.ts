import type { Configuration } from 'webpack-dev-server'
import { BuildOptions } from './types/types'

export function buildDevServer(options: BuildOptions): Configuration {
	return {
		port: options.port ?? 9000,
		open: true,
		hot: true,
	}
}
