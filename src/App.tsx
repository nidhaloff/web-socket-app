import React, { useState, useEffect } from "react";
import { IonApp, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonList } from "@ionic/react";
import {
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import io from "socket.io-client";

const uriConfig = {
  online: "wss://javascript.info/article/websocket/demo/hello",
  online2: "wss://javascript.info/chat", 
  online3: "wss://javascript.info/article/websocket/chat/ws",
  local: "http://localhost:3000"
}

//const socket = io(uriConfig.local);

let clients: Array<WebSocket> = [];

const App: React.FC = () => {
  const [res, setRes] = useState("");

  useEffect(() => {
    
  });

  const connect = () => {
   /*  socket.emit("event-connect", "subscribe");
    socket.on("return-data", (data: string) => {
      setRes(data);
      console.log(data);
    }); */

    console.log("connect function called");

    const socket = new WebSocket(uriConfig.online3);
    clients.push(socket);

    socket.onopen = function(e) { 
      console.log("[open] Connection established");
      console.log("Sending a msg to server");
      socket.send("My name is John");
    };
    
    socket.onmessage = function(event) {
      console.log(`[message] Data received from server: ${event.data}`);
      setRes('received porsche data successfully');
    };
    
    socket.onclose = function(event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
      }
    };
    
    socket.onerror = function(error) {
      console.log(`[error] ${error}`);
    };
  };

  const deconnect = () => { 
    if (clients && clients.length === 1 && clients[0])
    {
      clients[0].close();
      console.log(clients[0]);
      delete clients[0];
      console.log("Deconnection from socket");
    }
    else {
      console.log("there is no socket to close");
    }
    
  }

  return (
    <IonApp>
      <IonList>
          <IonItemSliding>
            <IonItemOptions onIonSwipe={connect} side="start">
              <IonItemOption onClick={connect}>Subscribe</IonItemOption>
              <IonItemOption
                color="danger"
                onClick={() => console.log("share clicked")}
              >
                Share
              </IonItemOption>
            </IonItemOptions>

            <IonItem>
              <IonLabel>Topic Subscription</IonLabel>
            </IonItem>

            <IonItemOptions onIonSwipe={deconnect} side="end">
              <IonItemOption onClick={() => console.log("unread clicked")}>
                Unread
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
          <IonCard>
            <IonCardContent className="ion-text-center">
              <h2> Porsche Data: </h2>
              <h3>{res}</h3>
            </IonCardContent>
          </IonCard>
          </IonList>
    </IonApp>
  );
};

export default App;
