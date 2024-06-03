const tg = window.Telegram.WebApp;

const getChatId = () => {
  console.log("initData:", tg.initData);
  const params = new URLSearchParams(tg.initData);
  const chatId = params.get("chat_id");
  console.log("chatId:", chatId);
  return chatId;
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
