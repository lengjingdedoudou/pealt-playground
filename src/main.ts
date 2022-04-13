import { createApp } from 'vue';
import { SafeAny } from './app/shared/types/yacommon';

// antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// preloader
import { preloaderFinished } from './app/core/startup/preloader';

import App from './main.vue';
import { store } from './store';
import router from './app/routes/routes.module';
import '@/app/routes/permission';

// less
import './styles.less';

preloaderFinished();

const app = createApp(App);

// @ts-ignore
import JsonViewer from 'vue3-json-viewer';
import 'vue3-json-viewer/dist/index.css';
app.use(JsonViewer);

// register global directive
import * as directives from '@shared/directive';
Object.keys(directives).forEach(key => {
	app.directive(key, (directives as { [key: string]: SafeAny })[key]);
});

// set message
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';
app.config.globalProperties.$message = message;

// set store
app.config.globalProperties.$store = store;

// load antd-icon
import { ICONS } from './style-icons';
ICONS.forEach(cmp => app.component(cmp.displayName, cmp));

// load icon
import { IconFont } from './style-icons-custom';
app.component('IconFont', IconFont);

// load sf widget
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';
new JsonSchemaModule().widgets.forEach((wit, name) => app.component(name, wit));

app.use(Antd);
app.use(store);
app.use(router);
app.mount('#app');
