import { Component } from 'vue';

export class JsonSchemaModule {
	widgets: Map<string, Component> = new Map();

	constructor() {
		// this.register()
	}

	private register(name: string, component: Component) {
		this.widgets.set(name, component);
	}
}
