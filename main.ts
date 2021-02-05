import { Client } from "discord.js";
import { token } from "./token";
import fetch from "node-fetch";

// Discord.jsモジュールを読み込む
// const Discord = require('discord.js');

// 新しいDiscordクライアントを作成
const client = new Client();

// クライアントの準備ができた際に実行されます
// このイベントはログインした後に１度だけ実行します
client.once("ready", () => {
  console.log("準備完了！");
});

client.on("message", (message) => {
  console.log(message.content);
  if (message.content === "!ping") {
    // メッセージが送信されたチャンネルへ「Pong.」を送り返す。
    message.channel.send({
      embed: {
        color: 7506394,
        description: "!pong",
      },
    });
  }
  if (message.content.startsWith("https://github.com/")) {
    if (message.author.bot) return;
    const url = message.content;
    const newurl = url.replace(/^(.*\/\/github.com\/.+\/.+\/)blob(\/.+)$/i, '$1raw$2')
    const paragraph = url.split("#");
    
    if (paragraph[1] != null) {
      console.log("ある");
      (async () => {
        try {
          const response = await fetch(newurl);
          let sendtext = ''; 
          const body = await response.text();
          const lines = body.split('\n');
          const LineNumber = paragraph[1].split("-");
          const begin = Number(LineNumber[0].substring(1))-1;
          const end  = Number(LineNumber[1].substring(1));
          console.log({begin,end});
          // for(let i  = first; i < last; i++){
          //   console.log(array[i]);
          //   sendtext = sendtext + array[i]+'\n'; 
          // }
          sendtext  = lines.slice(begin, end).join('\n');
           message.channel.send(
            //  {
          //   embed: {
          //     color: 7506394,
          //     description: "```js\n"+ sendtext + " ```",
          //   },
          // }
          "```js\n"+ sendtext + " ```",);

        } catch (error) {
          console.log(error);
        }
      })();
      // const gettext = document.querySelectorAll('#'+ L);
      // console.log(gettext);
    }
  }
});
// トークンを使ってDiscordにログイン
client.login();
