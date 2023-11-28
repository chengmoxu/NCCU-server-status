// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: list;
// 設置 Widget
const widget = new ListWidget();
widget.setPadding(10, 20, 10, 20);  // 上右下左，將上下安全空間調整為20

// 添加漸變的深色背景
const gradient = new LinearGradient();
gradient.colors = [new Color("#1c1c1e"), new Color("#293033")];
gradient.locations = [0, 1];
widget.backgroundGradient = gradient;

// 添加標題
const titleText = widget.addText("NCCU Server Status");
titleText.font = Font.boldSystemFont(14);  // 調整標題字體大小
titleText.textColor = Color.white();  // 調整標題字體顏色
widget.addSpacer(5);
// 檢查 https://www.nccu.edu.tw 的狀態
await checkWebsiteStatus("https://www.nccu.edu.tw", "政大首頁");

// 調整標題和網站狀態之間的間距為5
widget.addSpacer(5);

// 檢查 http://i.nccu.edu.tw 的狀態
await checkWebsiteStatus("http://i.nccu.edu.tw", "iNCCU");

// 調整網站狀態之間的間距為5
widget.addSpacer(5);

// 檢查 http://moodle.nccu.edu.tw 的狀態
await checkWebsiteStatus("http://moodle.nccu.edu.tw", "政大Moodle");

// 調整網站狀態之間的間距為5
widget.addSpacer(5);

// 檢查 http://nccu.5284.com.tw/MQS/routelist.jsp 的狀態
await checkWebsiteStatus("http://nccu.5284.com.tw/MQS/routelist.jsp", "政大公車動態");

// 調整網站狀態和底部信息之間的間距為5
widget.addSpacer(20);

// 顯示更新時間和執行時的當前時間在同一行
const currentDate = new Date();
const timeText = widget.addText(`更新時間：${currentDate.toLocaleTimeString()}`);
timeText.font = Font.systemFont(12);  // 縮小底部消息字體大小
timeText.textColor = Color.gray();  // 調整底部消息字體顏色

// 在桌面上顯示 Widget
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

// 完成腳本
Script.complete();

// 檢查網站狀態的函數
async function checkWebsiteStatus(url, title) {
  try {
    let response = await new Request(url).loadString();
    const online = response && response.length > 0;
    
    // 顯示網站狀態
    const label = widget.addText((online ? '🟢' : '🔴') + ' ' + title);
    label.font = Font.boldSystemFont(12);
    label.textColor = online ? Color.white() : Color.white();
  } catch (e) {
    // 網站不可訪問
    const label = widget.addText('🔴 ' + title + ' 網站目前不可訪問');
    label.font = Font.boldSystemFont(12);
    label.textColor = Color.red();
  }
}