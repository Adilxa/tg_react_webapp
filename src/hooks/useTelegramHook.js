const tg = window.Telegram.WebApp;

const getChatId = () => {
  const params = new URLSearchParams(tg.initData);
  return params.get("chat_id");
};

export const useTelegramHook = () => {
  const onClose = () => {
    tg.close();
  };

  const onToggleMainButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  const setHeaderColor = (color) => {
    tg.setHeaderColor(color);
  };

  const setMainButton = (text, isEnabled = true) => {
    tg.MainButton.setText(text);
    tg.MainButton.setParams({ is_active: isEnabled });
    tg.MainButton.show();
  };

  const chatId = getChatId();

  return {
    user: tg.initDataUnsafe?.user,
    userId: tg.initDataUnsafe?.user?.id,
    username: tg.initDataUnsafe?.user?.username,
    firstName: tg.initDataUnsafe?.user?.first_name,
    lastName: tg.initDataUnsafe?.user?.last_name,
    languageCode: tg.initDataUnsafe?.user?.language_code,
    chatId,
    onClose,
    onToggleMainButton,
    setHeaderColor,
    setMainButton,
    tg,
  };
};
