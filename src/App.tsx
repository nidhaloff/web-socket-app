import React, { useState } from "react";
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
  online: "wss://echo.wss-websocket.net", 
  local: "http://localhost:3000"
}

const socket = io(uriConfig.local);

const App: React.FC = () => {
  const [res, setRes] = useState("");

  const connect = () => {
    socket.emit("event-connect", "subscribe");
    socket.on("return-data", (data: string) => {
      setRes(data);
      console.log(data);
    });
  };

  return (
    <IonApp>
      <IonList>
          <IonItemSliding>
            <IonItemOptions onIonSwipe={connect} side="start">
              <IonItemOption>Subscribe</IonItemOption>
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

            <IonItemOptions side="end">
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
