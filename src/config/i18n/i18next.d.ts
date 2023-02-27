import { resources, defaultNS } from './i18n';

// Declare typ for mapping i18next resources
declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS; // defaultNS: 'homepage'
		resources: typeof resources.en; // type of an language in resources
	}
}
