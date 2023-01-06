import { NODE_ENV } from '..';
import en from '../languages/locales/en/';
import vn from '../languages/locales/vn/';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

export const defaultNS = 'homepage';
export const resources = {
	en: {
		common: en.common,
		translation: en.translation,
	},
	vn: {
		common: vn.common,
		translation: vn.translation,
	},
} as const;

i18next
	.use(LanguageDetector)
	.use(I18NextHttpBackend)
	.use(initReactI18next)
	.init(
		{
			fallbackLng: 'en',
			debug: NODE_ENV === 'development',
			resources,
			defaultNS,
			ns: ['translation', 'common'],
			lng: 'en',
		},
		(err: any, t: any) => {
			if (err) return console.log('something went wrong loading', err);
		}
	);
export default i18next;
