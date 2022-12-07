import React from "react";
import Podium from "../components/Game/Podium";

import { storiesOf } from "@storybook/react";

const dummyplayers = [
  {
    avatar_url: "./avatars/avatar-8.png",
    id: 1,
    host: true,
    color: "teal",
    name: "Josephyne",
    score: 3000
  },
  {
    avatar_url: "./avatars/avatar-7.png",
    id: 2,
    host: false,
    color: "green",
    name: "Lookie",
    score: 3600
  },
  {
    avatar_url: "./avatars/avatar-6.png",
    id: 3,
    host: false,
    color: "purple",
    name: "Buttons",
    score: 1000
  },
  {
    avatar_url: "./avatars/avatar-5.png",
    id: 4,
    host: false,
    color: "blue",
    name: "Winkle",
    score: 2400
  },
  {
    avatar_url: "./avatars/avatar-4.png",
    id: 5,
    host: false,
    color: "yellow",
    name: "Idontknow",
    score: 2800
  },
  {
    avatar_url: "./avatars/avatar-3.png",
    id: 6,
    host: false,
    color: "orange",
    name: "DidIlose?",
    score: 400
  },
  {
    avatar_url: "./avatars/avatar-2.png",
    id: 7,
    host: false,
    color: "red",
    name: "Josephyne",
    score: 200
  },
  {
    avatar_url: "./avatars/avatar-1.png",
    id: 8,
    host: false,
    color: "pink",
    name: "Ilostforsure",
    score: 0
  },

];

storiesOf("Lobby", module)
  .add("Default", () => (
  <Podium players={dummyplayers} />
  ))