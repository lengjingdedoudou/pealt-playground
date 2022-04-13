// 为了利用好模块扩充，你需要确认你的文件中至少有一个顶级的 import 或 export，哪怕只是一个 export {}。
// 任何包含一个顶级 import 或 export 的文件都被视为一个“模块”。如果类型声明在模块之外，该声明会覆盖而不是扩充原本的类型。

import type { MessageApi } from 'ant-design-vue/es/message';
import type { Store } from '@/store';

declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$store: Store;
		$message: MessageApi;
	}
}

export {};
