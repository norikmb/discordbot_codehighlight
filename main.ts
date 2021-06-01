import { Client } from "discord.js";
// import { token } from "./token";
import fetch from "node-fetch";

// Discord.jsモジュールを読み込む
// const Discord = require('discord.js');

// 新しいDiscordクライアントを作成
const client = new Client();
const token = process.env.DISCORD_BOT_TOKEN;

// クライアントの準備ができた際に実行されます
// このイベントはログインした後に１度だけ実行します
client.once('ready', () => {
  console.log('bot has started.');
});

client.on("message", (message) => {
  console.log(message.content);
  if (message.content.startsWith('https://github.com/')) {
    // botからの送信ではない
    if (message.author.bot) return;

    const url = message.content;
    const newurl = url.replace(/^(.*\/\/github.com\/.+\/.+\/)blob(\/.+)$/i, '$1raw$2')
    const paragraph = url.split('#');
    
    if (paragraph[1] != null) {
      console.log('Where you want to display is existing.');
      (async () => {
        try {
          const response = await fetch(newurl);
          let sendtext = ''; 
          const body = await response.text();
          const lines = body.split('\n');
          // 拡張子を取得
          const fileType = paragraph[0].split('/').slice(-1)[0].split('.').slice(-1)[0];
          const LineNumber = paragraph[1].split('-');

          // 行始めと行終わりを取得
          const begin = Number(LineNumber[0].substring(1))-1;
          const end  = Number(LineNumber[1].substring(1));
          console.log({begin,end});

          sendtext  = lines.slice(begin, end).join('\n');
          // テンプレートリテラル
           message.channel.send(
          ` \`\`\`${fileType}\n${sendtext}  \`\`\``);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }
});
// トークンを使ってDiscordにログイン
client.login(token);
// token.token
