import {
  setDebug,
  backButton,
  initData,
  init as initSDK,
  miniApp,
  viewport,
  themeParams,
  mockTelegramEnv,
  type ThemeParams,
  retrieveLaunchParams,
  emitEvent,
} from '@telegram-apps/sdk-react';

export async function init(options: {
  debug: boolean;
  eruda: boolean;
  mockForMacOS: boolean;
}): Promise<void> {
  setDebug(options.debug);
  initSDK();

  // Load Eruda in debug mode for in-app console
  if (options.eruda) {
    void import('eruda').then(({ default: eruda }) => {
      eruda.init();
      eruda.position({ x: window.innerWidth - 50, y: 0 });
    });
  }

  // macOS Telegram client has bugs with theme and safe area events
  if (options.mockForMacOS) {
    let firstThemeSent = false;
    mockTelegramEnv({
      onEvent(event, next) {
        const [eventName] = event;

        if (eventName === 'web_app_request_theme') {
          let tp: Partial<ThemeParams> = {};
          if (firstThemeSent) {
            const state = themeParams.state();
            tp = state as Partial<ThemeParams>;
          } else {
            firstThemeSent = true;
            const lp = retrieveLaunchParams();
            tp = ((lp.tgWebAppThemeParams as Partial<ThemeParams>) || {});
          }
          return emitEvent('theme_changed', { theme_params: tp as ThemeParams });
        }

        if (eventName === 'web_app_request_safe_area') {
          return emitEvent('safe_area_changed', {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          });
        }

        next();
      },
    });
  }

  backButton.mount();
  initData.restore();

  try {
    miniApp.mount();
    themeParams.bindCssVars();
  } catch {
    // miniApp not available outside Telegram
  }

  try {
    await viewport.mount();
    viewport.bindCssVars();
  } catch {
    // viewport not available outside Telegram
  }
}
