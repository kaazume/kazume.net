document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('actionButton');
    const loadingText = document.getElementById('loadingText');
    const resultText = document.getElementById('resultText');
    const keyValue = document.getElementById('keyValue');
    const cooldownText = document.getElementById('cooldownText');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    const popupTitle = document.getElementById('popupTitle');
    const closePopup = document.getElementById('closePopup');
    const themeSwitch = document.getElementById('themeSwitch');
  
    //解析しようとするな！コード欲しいなら本人に言え！(あげるとはいってない)
    //Don't try to analyze it! If you want the code, ask him! (I didn't say I'd give it to you!!!)

    const cooldownTime = 240;//んなに、4分は長いって？そうでもないさ、
    let cooldownTimer;
  
    closePopup.addEventListener('click', () => {
      popup.hidden = true;
      overlay.hidden = true;
      document.body.classList.remove('dark-overlay');
    });
  
    // Theme
    themeSwitch.addEventListener('change', () => {
      document.body.classList.toggle('dark', themeSwitch.checked);
      localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
    });
  
    //local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      themeSwitch.checked = true;
      document.body.classList.add('dark');
    }
  
    //ぶち壊れてる、要修正 -b3
    //ぶっちゃけめんどくさい
    actionButton.addEventListener('click', async () => {
      actionButton.disabled = true;
      loadingText.hidden = false;
      resultText.hidden = true;
      cooldownText.hidden = true;
  
      try {
        const response = await fetch('https://galaxkeygen.kazume.net/gen');
        const data = await response.json();
        if (data && data.key) {
          keyValue.textContent = data.key;
          resultText.hidden = false;
          popupTitle.textContent = '通知';
          popupMessage.textContent = `キーをコピーしました: ${data.key}`;
          popup.hidden = false;
          overlay.hidden = false;
          document.body.classList.add('dark-overlay');
        } else {
          popupTitle.textContent = 'エラー';
          popupMessage.textContent = '取得に失敗しました。';
          popup.hidden = false;
          overlay.hidden = false;
          document.body.classList.add('dark-overlay');
        }
      } catch (error) {
        console.error('Error:', error);
        popupTitle.textContent = 'エラー';
        popupMessage.textContent = 'エラーが発生しました。もう一度お試しください。';
        popup.hidden = false;
        overlay.hidden = false;
        document.body.classList.add('dark-overlay');
      } finally {
        loadingText.hidden = true;
        cooldownText.hidden = false;
  
        let remainingTime = cooldownTime;
        cooldownText.textContent = `クールダウン中: ${remainingTime}秒`;
        cooldownTimer = setInterval(() => {
          remainingTime--;
          cooldownText.textContent = `クールダウン中: ${remainingTime}秒`;
          if (remainingTime <= 0) {
            clearInterval(cooldownTimer);
            cooldownText.hidden = true;
            actionButton.disabled = false;
          }
        }, 1000);
      }
    });
  
    if (sessionStorage.getItem('cooldown')) {
      const remainingCooldown = parseInt(sessionStorage.getItem('cooldown'), 10) - Math.floor((Date.now() - parseInt(sessionStorage.getItem('cooldownStart'), 10)) / 1000);
      if (remainingCooldown > 0) {
        actionButton.disabled = true;
        cooldownText.hidden = false;
        cooldownText.textContent = `クールダウン中: ${remainingCooldown}秒`;
        let remainingTime = remainingCooldown;
        cooldownTimer = setInterval(() => {
          remainingTime--;
          cooldownText.textContent = `クールダウン中: ${remainingTime}秒`;
          if (remainingTime <= 0) {
            clearInterval(cooldownTimer);
            cooldownText.hidden = true;
            actionButton.disabled = false;
          }
        }, 1000);
      } else {
        sessionStorage.removeItem('cooldown');
        sessionStorage.removeItem('cooldownStart');
      }
    }
  
    window.addEventListener('beforeunload', () => {
      if (actionButton.disabled) {
        sessionStorage.setItem('cooldown', cooldownTimer ? cooldownTime - (60 - parseInt(cooldownText.textContent.match(/\d+/)[0], 10)) : 0);
        sessionStorage.setItem('cooldownStart', Date.now());
      }
    });
  });

  //えんどしえんどしえーんどれーす
  document.addEventListener('DOMContentLoaded', async () => {
    const statusMessage = document.getElementById('statusMessage');
  
    try {
      const response = await fetch('https://galaxkeygen.kazume.net/status');
      const data = await response.json();
  
      if (data && data.status) {
        if (data.status === 'working') { 
          statusMessage.textContent = 'online';
          statusMessage.classList.add('online'); 
        } else {
          statusMessage.textContent = 'no working';
          statusMessage.classList.add('not-online');
        }
      } else {
        statusMessage.textContent = 'offline';
        statusMessage.classList.add('offline'); 
      }
    } catch (error) {
      console.error('Error:', error);
      statusMessage.textContent = 'offline';
      statusMessage.classList.add('offline'); 
    }
  });
  