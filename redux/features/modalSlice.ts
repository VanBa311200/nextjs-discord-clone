import { Channel, ChannelType, Server } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}

type ModalState = {
  type?: ModalType;
  isOpen: boolean;
  data?: ModalData;
};

const initialState = {
  type: undefined,
  isOpen: false,
} as ModalState;

export const modalslice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (
      state,
      { payload }: PayloadAction<{ type: ModalType; data?: ModalData }>,
    ) => {
      state.isOpen = true;
      state.type = payload.type;
      state.data = payload.data;
    },
    onClose: () => initialState,
  },
});

export const { onOpen, onClose } = modalslice.actions;
export default modalslice.reducer;
